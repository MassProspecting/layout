tagsJs = {
    // increase the number of tags with belonging='true' in the tag button
    // with data-id='id_lead'. Update the color of the badge.
    increase_tag_button: function(parent) {
        let id_lead = parent.data('id');
        // get the span.caption inside the button.btn-tag-lists with data-id='id_lead'
        // get the value of the span
        // update the text into the span, with the number of tags with belonging='true'
        let span = $('button.btn-tag-lists[data-id="'+id_lead+'"] span.caption');
        let value = parseInt(span.html())+1;            
        span.html(value.toString());    
        if (value == 0) {
            span.removeClass('badge-blue');
            span.addClass('badge-gray');
        } else {
            span.removeClass('badge-gray');
            span.addClass('badge-blue');
        }
    },

    // decrease the number of tags with belonging='true' in the tag button
    // with data-id='id_lead'. Update the color of the badge.
    decrease_tag_button: function(parent) {
        let id_lead = parent.data('id');
        // get the span.caption inside the button.btn-tag-lists with data-id='id_lead'
        // get the value of the span
        // update the text into the span, with the number of tags with belonging='true'
        let span = $('button.btn-tag-lists[data-id="'+id_lead+'"] span.caption');
        let value = parseInt(span.html())-1;            
        span.html(value.toString());    
        if (value == 0) {
            span.removeClass('badge-blue');
            span.addClass('badge-gray');
        } else {
            span.removeClass('badge-gray');
            span.addClass('badge-blue');
        }
    },

    // enable/disable the add button depending on the value of the textfield
    enable_add_button: function(parent) {
        let id_lead = parent.data('id');
        // find the ul with this data-id='id_lead'
        let ul = document.querySelector('ul.ul-tags[data-id="'+id_lead+'"]');
        // find the button inside the ul
        let button = ul.querySelector('button.btn-create-tag-list');
        // find the textfield inside the ul
        let textfield = ul.querySelector('input.input-tags');
        // remove any span just below the textfield
        let span = ul.querySelectorAll('span:not(.badge)');
        // if the textfield is empty, disable the button
        if (textfield.value.trim() == '') {
            // disable the button
            button.disabled = true;
            // remove any span just below the textfield
            if (span) {
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
                if (span) {
                    span.remove();
                }
            }
        }
    },

    // remove an li element from the ul with data-id='id_lead' and data-id-tag-list='id_tag'
    remove_tag: function(parent, id_tag) {
        let id_lead = parent.data('id');
        // find the il with this data-id='id_lead' and data-id-tag='id_tag'
        let li = document.querySelector('li[data-id="'+id_lead+'"][data-id-tag-list="'+id_tag+'"]');
        // delete the element
        li.remove();
    },

    createElementFromHTML: function(htmlString) {
        // Sanitize the HTML string to prevent XSS
        const sanitizedHtml = DOMPurify.sanitize(htmlString);
  
        // Create a Range object
        const range = document.createRange();
  
        // Parse the sanitized HTML string into a DocumentFragment
        const documentFragment = range.createContextualFragment(sanitizedHtml);
  
        return documentFragment;
    },

    // receive a hash descriptor of the tag related with the lead { id:, name:, belonging: }
    add_tag: function(parent, h, opacity='1.0') {
        let id_lead = parent.data('id');
        // 
        let div = document.querySelector('div.div-tags[data-id="'+id_lead+'"]');
        // remove '<i>' element with innert text 'No tag lists found' from the div content
        $('i:contains("No tag lists found")').remove();
        // create the li element, with hand cursor
        let li = document.createElement('li');
        li.setAttribute('data-id-tag-list', h.id);
        li.setAttribute('data-id', id_lead);
        li.setAttribute('data-name', h.name);
        li.setAttribute('data-belonging', h.belonging.toString());
        li.style.cursor = 'pointer';
        li.style.opacity = opacity;
        // create an icon-ok element, with style green text color
        let icon = document.createElement('i');
        icon.setAttribute('data-id-tag-list', h.id);
        icon.setAttribute('data-id', id_lead);
        if ( h.belonging ) { 
            icon.setAttribute('style', 'color: green');
            icon.setAttribute('class', 'icon-check');
        } else {
            icon.setAttribute('style', 'color: gray');
            icon.setAttribute('class', 'icon-check-empty');
        }
        // add the icon and the name of the list to the anchor
        li.appendChild(icon);

        tagHtml = ` - <span class='badge badge-black'><i class='icon-circle' style='color:${h.color}'></i>${h.name}</span>`;
        tag = tagsJs.createElementFromHTML(tagHtml);
        li.append(tag);
        
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
            // find the icon about this tag list and this lead
            let icon = document.querySelector('i[data-id-tag-list="'+h.id+'"][data-id="'+id_lead+'"]');
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
    },

    draw: function(parent, h) {
        let id_lead = parent.data('id');
        
        const tagsHtml = `
            <div class="tags" data-id="${id_lead}">
                <div class="buttons">
                    <div class="btn-group">
                        <button class="btn btn-link dropdown-toggle btn-tag-lists" data-id="${id_lead}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="caption badge badge-blue">1</span>
                        </button>
                        <ul class="dropdown-menu ul-tags" data-id="${id_lead}">
                            <li class="div-tag-lists" data-id="${id_lead}">
                                <div class="div-tags" data-id="${id_lead}">
                                    <!-- tags added by JavaScript are placed here -->
                                </div>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <p>Create New Tag</p>
                                <input type="text" class="input input-medium input-tags" data-id="${id_lead}" placeholder="Enter tag name"><br> 
                                <button class="btn btn-link btn-create-tag-list" data-id="${id_lead}" disabled>
                                    <i class="icon-plus"></i> Add
                                </button>
                            </li>
                        </ul>
                    </div>      
                </div>
            </div>
        `;
        parent.append(tagsHtml);

        // store function to trigger when the user open the list
        if (h['on_expand'] != null) {
            let o = $('button.btn-tag-lists[data-id="'+id_lead+'"]');
            o.on('click', h['on_expand']);
        }

        // en endit any textfield inside a ul,
        // enable/disable the add button depending on the value of the textfield
        // by calling function tagsJs.enable_add_button(parent)
        $('ul[data-id="'+id_lead+'"].ul-tags').on('keyup', 'input.input-tags', function() {
            tagsJs.enable_add_button($(this).closest('ul'));
        });

        // when click on .btn-tag-lists, set focus on input
        $('button[data-id="'+id_lead+'"].btn-tag-lists').click(function(e) {
            let id_lead = $(this).data('id');
            let input = document.querySelector('input[data-id="'+id_lead+'"].input-tags');
            setTimeout(() => {
                $(input).focus();
            }, 0); // Add a minimal delay
        });


        // avoid to close the ul when click on the input box
        $('input[data-id="'+id_lead+'"].input-tags').click(function(e) {
            // JavaScript, stop additional event listeners
            // reference: https://www.w3schools.com/jsref/event_stopimmediatepropagation.asp
            e.stopImmediatePropagation();
        });

        // call add tag event
        $('button.btn-create-tag-list[data-id="'+id_lead+'"]').click(function(e) {
            let s = $('input[data-id="'+id_lead+'"].input-tags').val();

            // store function to trigger when the user adds tag
            if (h['on_create_tag'] != null) {
                h['on_create_tag'](s);
            } else {
                tagsJs.add_tag(parent, {
                    id: s,
                    name: s,
                    color: 'gray',
                    belonging: false              
                });
            }

            // clear content of the input.
            $('input[data-id="'+id_lead+'"].input-tags').val('');
        });

        // better user experience: when press ENTER on any .input-tags, for click on the add button with same data-id.
        $('input[data-id="'+id_lead+'"].input-tags').keypress(function(e) {
            if (e.which == 13) {
                // find button .btn-create-tag-list with same data-id value
                let id_lead = $(this).attr('data-id');
                let button = $('button.btn-create-tag-list[data-id="'+id_lead+'"]');
                // if button is enabled
                if ( button.prop('disabled') == false ) {
                    // click the button
                    button.click();
                }
            }
        });  

    },
}; 