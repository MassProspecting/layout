// increase the number of tags with belonging='true' in the tag button
// with data-id-lead='id_lead'. Update the color of the badge.
function increase_tag_button(id_lead) {
    // get the span.caption inside the button.btn-tag-lists with data-id-lead='id_lead'
    // get the value of the span
    // update the text into the span, with the number of tags with belonging='true'
    let span = $('button.btn-tag-lists[data-id-lead="'+id_lead+'"] span.caption');
    let value = parseInt(span.html())+1;            
    span.html(value.toString());    
    if (value == 0) {
        span.removeClass('badge-blue');
        span.addClass('badge-gray');
    } else {
        span.removeClass('badge-gray');
        span.addClass('badge-blue');
    }
}

// decrease the number of tags with belonging='true' in the tag button
// with data-id-lead='id_lead'. Update the color of the badge.
function decrease_tag_button(id_lead) {
    // get the span.caption inside the button.btn-tag-lists with data-id-lead='id_lead'
    // get the value of the span
    // update the text into the span, with the number of tags with belonging='true'
    let span = $('button.btn-tag-lists[data-id-lead="'+id_lead+'"] span.caption');
    let value = parseInt(span.html())-1;            
    span.html(value.toString());    
    if (value == 0) {
        span.removeClass('badge-blue');
        span.addClass('badge-gray');
    } else {
        span.removeClass('badge-gray');
        span.addClass('badge-blue');
    }
}

// enable/disable the add button depending on the value of the textfield
function enable_add_button(id_lead) {
  // find the ul with this data-id-lead='id_lead'
  let ul = document.querySelector('ul.ul-tags[data-id-lead="'+id_lead+'"]');
  // find the button inside the ul
  let button = ul.querySelector('button.btn-create-tag-list');
  // find the textfield inside the ul
  let textfield = ul.querySelector('input.input-tags');
  // if the textfield is empty, disable the button
  if (textfield.value.trim() == '') {
    // disable the button
    button.disabled = true;
    // remove any span just below the textfield
    let span = ul.querySelector('span');
    if (span) {
      // remove span
      span.remove();
    }
  } else {
    // if the name already exists in the list, disabe the button
    if (ul.querySelector('li[data-name="'+textfield.value.trim()+'"]')) {
      // disable the button
      button.disabled = true;
      // show a red text 'Name already exists' just below the textfield
      textfield.parentNode.insertBefore(document.createElement('span'), textfield.nextSibling).innerHTML = 'Name already exists';
    } else {
      // enable the button
      button.disabled = false;
      // remove any span just below the textfield
      let span = ul.querySelector('span');
      if (span) {
        // remove span
        span.remove();
      }
    }
  }
}

// remove an li element from the ul with data-id-lead='id_lead' and data-id-tag-list='id_tag'
function remove_tag(id_lead, id_tag) {
  // find the il with this data-id-lead='id_lead' and data-id-tag='id_tag'
  let li = document.querySelector('li[data-id-lead="'+id_lead+'"][data-id-tag-list="'+id_tag+'"]');
  // delete the element
  li.remove();
}



// receive a hash descriptor of the tag related with the lead { id:, name:, belonging: }
function add_tag(id_lead, h, opacity='1.0') {
  let div = document.querySelector('div.div-tag-lists[data-id-lead="'+id_lead+'"]');
  // remove '<i>' element with innert text 'No tag lists found' from the div content
  $('i:contains("No tag lists found")').remove();
  // create the li element, with hand cursor
  let li = document.createElement('li');
  li.setAttribute('data-id-tag-list', h.id);
  li.setAttribute('data-id-lead', id_lead);
  li.setAttribute('data-name', h.name);
  li.setAttribute('data-belonging', h.belonging.toString());
  li.style.cursor = 'pointer';
  li.style.opacity = opacity;
  // create an icon-ok element, with style green text color
  let icon = document.createElement('i');
  icon.setAttribute('data-id-tag-list', h.id);
  icon.setAttribute('data-id-lead', id_lead);
  if ( h.belonging ) { 
    icon.setAttribute('style', 'color: green');
    icon.setAttribute('class', 'icon-check');
  } else {
    icon.setAttribute('style', 'color: gray');
    icon.setAttribute('class', 'icon-check-empty');
  }
  // add the icon and the name of the list to the anchor
  li.appendChild(icon);
  li.appendChild(document.createTextNode(' '));
  li.appendChild(document.createTextNode(h.name));
  // if the tag is deleted, then add a "deleted" label
  if (h.deleted === true) {
    li.appendChild(document.createTextNode(' (deleted)'));
  }
  // add the li to the ul
  $(div).append(li);
  // on click on the li, call ajax to add/remove the lead from/to the tag list
  li.addEventListener('click', function(e) {
    // decide the access point to call
    if ($(li).attr('data-belonging') == 'true') {
      // remove from the list
      access_point = 'remove_tag';
    } else {
      // add to the list
      access_point = 'add_tag';
    }
    // set the li with 50% opacity, to show that it is being processed
    li.style.opacity = '0.5';
    // call the ajax
    $.ajax({
      url: '/ajax/leads/'+access_point+'.json',
      type: 'POST',
      data: {
        id_lead: id_lead,
        id_tag: h.id
      },
      success: function(data) {
        // get the json response
        let response = JSON.parse(data);
        // if the response is ok, update the icon
        if (response.status == 'success') {
          // the titlt is updated immedaitelly after the ajax call. don't wait for response because of an ux matter. 
          // update the li opacity, to show that is has been processed successfully
          li.style.opacity = '1.0';

          if ($(li).attr('data-belonging') == 'true') {
            increase_tag_button(id_lead);
          } else {
            decrease_tag_button(id_lead);
          }
    
        } else {
          if ( response.status =~ /No Credits/ ) {
            window.location.replace('/plans');
          } else {
            alert('An error occured while updating the list:' + h.name + '. Error: ' + response.status);
          }
        }
      },
      error: function(data) {
        alert('Unknown error occured while updating the list:' + h.name + '.');
      },
    });
    // find the icon about this tag list and this lead
    let icon = document.querySelector('i[data-id-tag-list="'+h.id+'"][data-id-lead="'+id_lead+'"]');
    // if the icon is green, change it to gray
    if ($(li).attr('data-belonging') == 'true') {
      icon.setAttribute('style', 'color: gray');
      icon.setAttribute('class', 'icon-check-empty');
      li.setAttribute('data-belonging', 'false');
    } else {
      icon.setAttribute('style', 'color: green');
      icon.setAttribute('class', 'icon-check');
      li.setAttribute('data-belonging', 'true');
    }
    // JavaScript, stop additional event listeners
    // reference: https://www.w3schools.com/jsref/event_stopimmediatepropagation.asp
    e.stopImmediatePropagation();
  });
}

function add_tag_to_dropdown(id_tag, name) {
  $('select#id_tag').append(new Option(name, id_tag));
}

function init_lead_tags() {
    // en endit any textfield inside a ul,
    // enable/disable the add button depending on the value of the textfield
    // by calling function enable_add_button(id_lead)
    $('ul.ul-tags').on('keyup', 'input.input-tags', function() {
      enable_add_button($(this).closest('ul').data('id-lead'));
    });

    // better user experience: when click on any tag button, 
    // 1. disable the textfield
    // 2. disable the add button
    // 3. set '<center><i>Loading...</i></center>' as innerhtml of the div
    // 4. call ajax to bring the full list of tag lists, and wich are linked to this lead
    // 5. add the tag lists to the div.div-tag-lists
    // 6. enable the textfield 
    // 7. call function to enable/disable the add button depending on the value of the textfield
    // 8. set focus on the textfield
    $('button.btn-tag-lists').click(function() {
      // variables
      let id_lead = $(this).data('id-lead');
      // get the text inside the span  
      let div = document.querySelector('div.div-tag-lists[data-id-lead="'+id_lead+'"]');
      // 1. disable the textfield
      $('ul.ul-tags[data-id-lead="'+id_lead+'"] input.input-tags').prop('disabled', true);
      // 2. disable the add button
      $('ul.ul-tags[data-id-lead="'+id_lead+'"] button.btn-create-tag-list').prop('disabled', true);
      // 3. set '<center><i>Loading...</i></center>' as innerhtml of the div
      div.innerHTML = '<center><i>Loading...</i></center>';
      // 4. call ajax to bring the full list of tag lists, and wich are linked to this lead
      $.ajax({
        url: '/ajax/leads/get_tags.json',
        type: 'POST',
        data: { id_lead: id_lead, name: name },
        success: function(data) {
          // get the json response
          let response = JSON.parse(data);
          if (response.status == 'success') {
            // 5. add the tag lists to the div.div-tag-lists          
            // remove all the lists
            div.innerHTML = '';
            response.tags.forEach(function(h) { 
              add_tag(id_lead, h);
            });
            // if there are no tags to show, show a message
            if (response.tags.length == 0) {
              // find the div
              let div = document.querySelector('div.div-tag-lists[data-id-lead="'+id_lead+'"]');
              // create the li element, with hand cursor
              let li = document.createElement('li');
              let center = document.createElement('center');
              let i = document.createElement('i');
              i.innerHTML = 'No tag lists found';
              center.appendChild(i);
              li.appendChild(center);
              // add the li to the ul
              $(div).append(li);  
            }
            // 6. enable the textfield 
            $('ul.ul-tags[data-id-lead="'+id_lead+'"] input.input-tags').prop('disabled', false);
            // 7. call function to enable/disable the add button depending on the value of the textfield
            enable_add_button(id_lead);
            // 8. set focus on the textfield
            // becuase of any other javascript conflic, I have to  add a delay of 100ms before focus the inputbox.
            setTimeout(function() {
              $('ul.ul-tags[data-id-lead="'+id_lead+'"] li input.input-tags').focus();
            }, 100);      
          } else {
            alert(response.status);
            alert('An error occured trying to load the tag lists. Error: ' + response.status);
          }
        }, error: function(data) {
          // get the json response
          let response = JSON.parse(data);
          alert('Unknown error occured when loading the tag lists.');
        }
      });
    });  

    // better user experience: when click on the '+ add' button, 
    // 1. call AJAX to create the new list
    // 2. add the new list to all the tag list dropdown
    // 3. delete the content of the input box
    $('button.btn-create-tag-list').click(function(e) {
      // variables
      let name = $(this).parent().find('input.input-tags').val();
      let id_lead = $(this).data('id-lead');
      // 1. call AJAX to create the new list
      $.ajax({
        url: '/ajax/leads/create_tag.json',
        type: 'POST',
        data: { id_lead: id_lead, name: name },
        success: function(data) {
          // get the json response
          let response = JSON.parse(data);
          if (response.status == 'success') {
            // remove the dummy li now that I received the ID of the new tag list.
            remove_tag(id_lead, '123');
            // 2. add the new tag to this the tag list dropdown
            add_tag(id_lead, {id: response.id_tag, name: name, belonging: true});
            // 3. add the new tag to the tag list dropdown
            add_tag_to_dropdown(response.id_tag, name);
        } else {
            if ( response.status =~ /No Credits/ ) {
              window.location.replace('/plans');
            } else {
              alert('An error occured while creating the new list:' + name + '. Error: ' + response.status);
            }
          }
        },
        error: function(data) {
          alert('Unknown error occured while creating the new list:' + name);
        }
      });
      // better user experience: the new list is added immedaitelly after the ajax call. don't wait for response because of an ux matter. 
      // so I add a dummy li until I receive the ID of the new tag list.
      add_tag(id_lead, {id: '123', name: name, belonging: true}, '0.5');
      // increase the number of tags with belonging='true' in the tag button
      increase_tag_button(id_lead);
      // 3. delete the content of the input box belinging the parent ul element
      $('input.input-tags[data-id-lead="'+id_lead+'"]').val('');
      // JavaScript, stop additional event listeners
      // reference: https://www.w3schools.com/jsref/event_stopimmediatepropagation.asp
      e.stopImmediatePropagation();
    });

    // avoid to close the ul when click on the input box
    $('input.input-tags').click(function(e) {
      // JavaScript, stop additional event listeners
      // reference: https://www.w3schools.com/jsref/event_stopimmediatepropagation.asp
      e.stopImmediatePropagation();
    });

    // better user experience: when press ENTER on any .input-tags, for click on the add button with same data-id-lead.
    $('input.input-tags').keypress(function(e) {
      if (e.which == 13) {
        // find button .btn-create-tag-list with same data-id-lead value
        let id_lead = $(this).attr('data-id-lead');
        let button = $('button.btn-create-tag-list[data-id-lead="'+id_lead+'"]');
        // if button is enabled
        if ( button.prop('disabled') == false ) {
          // click the button
          button.click();
        }
      }
    });  
}