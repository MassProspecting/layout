window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-XHCG5LE744");

//////////////////////////////////////////////////////////

DEMO_CURRENT_THEME = "black-blue";

// Include Bootstrap stylesheet
document.write(
  '<link href="/core/css/' +
    DEMO_ADMINFLARE_VERSION +
    "/" +
    DEMO_CURRENT_THEME +
    '/bootstrap.min.css" media="all" rel="stylesheet" type="text/css" id="bootstrap-css">'
);
// Include AdminFlare stylesheet
document.write(
  '<link href="/core/css/' +
    DEMO_ADMINFLARE_VERSION +
    "/" +
    DEMO_CURRENT_THEME +
    '/adminflare.min.css" media="all" rel="stylesheet" type="text/css" id="adminflare-css">'
);
// Include AdminFlare page stylesheet
document.write(
  '<link href="/core/css/' +
    DEMO_ADMINFLARE_VERSION +
    '/pages.css" media="all" rel="stylesheet" type="text/css">'
);
// Include Style to Draw Wizards
document.write(
  '<link href="/core/css/wizard.css" media="all" rel="stylesheet" type="text/css">'
);
// Include Style to Draw Plan Tables
document.write(
  '<link href="/core/css/plantable.css" media="all" rel="stylesheet" type="text/css">'
);
// Include Style to Draw Landing Pages
//		document.write('<link href="/core/css/landing.css" media="all" rel="stylesheet" type="text/css">');
// Include Awesomplete stylesheet
document.write(
  '<link href="/core/css/awesomplete.css" media="all" rel="stylesheet" type="text/css">'
);
// Include FilterJS stylesheet
document.write(
  '<link href="/core/css/filters.css" media="all" rel="stylesheet" type="text/css">'
);
// Include NavBar
document.write(
  '<link href="/core/css/navbar.css" media="all" rel="stylesheet" type="text/css" id="ajax-navbar-css">'
);
// Include Dialog
document.write(
  '<link href="/core/css/dialog.css" media="all" rel="stylesheet" type="text/css" id="ajax-dialog-css">'
);

// Include CSS files of extensions

document.write(
  '<link href="/filtersjs/css/filters.css" media="all" rel="stylesheet" type="text/css">'
);

/////////////////////////////////////////////////////////////////

// behaviour of pages when load
let hide_loading_message_after_page_load = true;

//
const reLinkedInGroup =
  /^http(s)?:\/\/(www\.)?linkedin\.com\/groups\/(\d+)(\/(profile)?)?$/;
const reLinkedInGroupUrlCode = /(\d+)/;
function getLinkedInGroupUrlCode(url) {
  if (!reLinkedInGroup.test(url)) {
    return null;
  }
  return url.match(reLinkedInGroupUrlCode)[0];
}

// apply tooltips CSS to any element with a title attribue
function applyToolTips() {
  $("[title]").tooltip({
    placement: "bottom",
  });
}

// enable select-all-text when focus on any input with class `select-all-on-focus`
function enableSelectAllTextOnFocus() {
  $(".select-all-on-focus").focus(function () {
    this.select();
  });
}

// this function check/uncheck all the rows,
// then calls methods h['afterCallback'] in order.
function enableSelectRows(h) {
  // update list of selected rows
  function updateSelectedIDs() {
    a = $(".selected-ids");
    i = 0;
    a.val("");
    $(".select-row:checked").each(function (index) {
      if (i > 0) {
        a.val(a.val() + ",");
      }
      a.val(a.val() + $(this).data("id"));
      i++;
    });
  }

  // initialize selected rows, only if sessionPersistance is on.
  if (h["sessionPersistance"] == true) {
    $(".selected-ids")
      .val()
      .split(",")
      .forEach(function (id) {
        $('.select-row[data-id="' + id + '"]').prop("checked", true);
      });
    // callback function for after you select/unselect rows
    h["afterCallback"]();
  }

  // select/unselect all rows.
  $(".select-all-rows").click(function () {
    b = $(this);
    d = $(".select-row");
    if (b.prop("checked")) {
      d.prop("checked", true);
    } else {
      d.prop("checked", false);
    }
    // update list of selected rows
    updateSelectedIDs();
    // callback function for after you select/unselect rows
    h["afterCallback"]();
  });

  // select/unselect one signle row
  $(".select-row").click(function () {
    // update list of selected rows
    updateSelectedIDs();
    // callback function for after you select/unselect rows
    h["afterCallback"]();
  });
}

//
function selectRow(id) {
  $('.select-row[data-id="' + id + '"]').prop("checked", true);
}

//
function newHttpRequest() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return xmlhttp;
}

//
function newXmlParser(txt) {
  if (window.DOMParser) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(txt, "text/xml");
  } // Internet Explorer
  else {
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(txt);
  }

  return xmlDoc;
}

//
function addEvent(element, eventName, fn) {
  if (element.addEventListener) element.addEventListener(eventName, fn, false);
  else if (element.attachEvent) element.attachEvent("on" + eventName, fn);
}

function showWait(s) {
  $("#wait").show();
  $("#wait-caption").text(s);
}

function hideWait(s) {
  $("#wait").hide();
}

function semiTransparentLinks() {
  // make all the .semi-transparent-link semi-transparent
  $(".semi-transparent-link").css("opacity", "0.5");
  // a .semi-transparent-link link gets opaciity when the mouse pointer is over
  $(".semi-transparent-link").hover(
    function () {
      $(this).css("opacity", "1");
    },
    function () {
      $(this).css("opacity", "0.5");
    }
  );
}

function formatLinks() {
  // remove text decoration from all links
  $("a").css("text-decoration", "none");
  // remove text decoration from all buttons with class .btn-link
  $(".btn-link").css("text-decoration", "none");
}

////////////////////////////////////////////////////////////////////////////////////////


function closePanel(panelId) {
  document.getElementById(panelId).style.display = "none";

  document.getElementById("arrow1").style.display = "none";
  document.getElementById("arrow2").style.display = "none";
  document.getElementById("arrow3").style.display = "none";

  const pool1 = document.getElementById("pool1").style.display !== "none";
  const pool2 = document.getElementById("pool2").style.display !== "none";
  const pool3 = document.getElementById("pool3").style.display !== "none";

  const visiblePanels = [pool1, pool2, pool3].filter(Boolean).length;
  if (visiblePanels === 1) {
    if (pool1) {
      document.querySelector("#pool1 .close-btn").style.display = "none";
    }
    if (pool2) {
      document.querySelector("#pool2 .close-btn").style.display = "none";
    }
    if (pool3) {
      document.querySelector("#pool3 .close-btn").style.display = "none";
    }
  }

  adjustLayout();
}

function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  const pool1 = document.getElementById("pool1");
  const pool2 = document.getElementById("pool2");
  const pool3 = document.getElementById("pool3");
  const arrow1 = document.getElementById("arrow1");
  const arrow2 = document.getElementById("arrow2");
  const arrow3 = document.getElementById("arrow3");

  if (window.matchMedia("(max-width: 768px)").matches) {
    pool1.style.display = "none";
    pool2.style.display = "none";
    pool3.style.display = "none";

    panel.style.display = "block";

    arrow1.style.display = "none";
    arrow2.style.display = "none";
    arrow3.style.display = "none";
  } else {
    const pool1Visible = window.getComputedStyle(pool1).display !== "none";
    const pool2Visible = window.getComputedStyle(pool2).display !== "none";
    const pool3Visible = window.getComputedStyle(pool3).display !== "none";

    const panelVisible = window.getComputedStyle(panel).display !== "none";

    if (!panelVisible) {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }

    const visiblePanels = [pool1, pool2, pool3].filter(Boolean).length;
    if (visiblePanels !== 1) {
      if (pool1) {
        document.querySelector("#pool1 .close-btn").style.display = "block";
      }
      if (pool2) {
        document.querySelector("#pool2 .close-btn").style.display = "block";
      }
      if (pool3) {
        document.querySelector("#pool3 .close-btn").style.display = "block";
      }
    }
    if (pool1Visible || pool2Visible || pool3Visible) {
      arrow1.style.display = "none";
      arrow2.style.display = "none";
      arrow3.style.display = "none";
    }
  }

  adjustLayout();
}

function openPanel(panelId) {
  const panel = document.getElementById(panelId);
  panel.style.display = "block";
  adjustLayout();
}
function adjustLayout() {
  const sidebar = document.getElementById("pool1");
  const chatSection = document.getElementById("pool2");
  const thirdSection = document.getElementById("pool3");

  if (
    sidebar.style.display !== "none" &&
    chatSection.style.display !== "none" &&
    thirdSection.style.display !== "none"
  ) {
    sidebar.style.width = "25%";
    chatSection.style.width = "50%";
    thirdSection.style.width = "25%";
    //  document.getElementById('arrow-btn').style.display = 'none'
  } else if (
    sidebar.style.display !== "none" &&
    chatSection.style.display !== "none"
  ) {
    sidebar.style.width = "30%";
    chatSection.style.width = "70%";
  } else if (
    chatSection.style.display !== "none" &&
    thirdSection.style.display !== "none"
  ) {
    chatSection.style.width = "70%";
    thirdSection.style.width = "30%";
  } else if (
    sidebar.style.display !== "none" &&
    thirdSection.style.display !== "none"
  ) {
    sidebar.style.width = "50%";
    thirdSection.style.width = "50%";
  } else {
    if (sidebar.style.display !== "none") sidebar.style.width = "100%";
    if (chatSection.style.display !== "none") chatSection.style.width = "100%";
    if (thirdSection.style.display !== "none")
      thirdSection.style.width = "100%";
  }
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const tabContainer = button.closest(".tab-container");
    const tabId = button.getAttribute("data-tab");

    tabContainer.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    tabContainer.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    tabContainer.querySelector(`#${tabId}`).classList.add("active");
  });
});

function pushOutreach(outreach_type, id_profile, id_lead, id_company, body) {
  // show ajax wait
  showWait();

  // do the AJAX call
  $.ajax({
    url: "/ajax/unibox/push.json",
    type: "POST",
    data: {
      outreach_type: outreach_type,
      id_profile: id_profile,
      id_lead: id_lead,
      id_company: id_company,
      body: body,
    },
    success: function (data) {
      // hide ajax wait
      hideWait();
      // parse JSON response
      json = JSON.parse(data);
      // validate json status
      if (json.status != "success") {
        alert(json.status);
      } else {
        // clean the textbox
        $("#new_message_body").val("");
        // reload the list of outreaches
        let scroll_to_bottom = true;
        let refresh_insights = false;
        loadOutreaches(
          id_profile,
          id_lead,
          id_company,
          scroll_to_bottom,
          refresh_insights
        );
      }
    },
  });
}

// load latest `limit` outreaches between a profile, and a lead or company
function loadOutreaches(
  id_profile,
  id_lead,
  id_company,
  scroll_to_bottom = true,
  refresh_insights = true,
  limit = 100
) {
  //alert('id_profile:'+id_profile+'.');
  //alert('id_lead:'+id_lead+'.');
  //alert('id_company:'+id_company+'.');

  if (id_lead == "") {
    id_lead = null;
  }
  if (id_company == "") {
    id_company = null;
  }

  // do the AJAX call
  $.ajax({
    url: "/ajax/unibox/outreaches.json",
    type: "POST",
    data: {
      id_profile: id_profile,
      id_lead: id_lead,
      id_company: id_company,
      limit: limit,
    },
    success: function (data) {
      // parse JSON response
      json = JSON.parse(data);
      // validate json status
      if (json.status != "success") {
        alert(json.status);
      } else {
        // hide loading button
        // clean previous content
        $("#outreaches_div").html("");
        // iterate array json.data
        for (var i = 0; i < json.data.length; i++) {
          // get outreach
          let h = json.data[i];
          let picture_url = null;
          let name = null;
          let url = null;
          let body = null;
          let status_icon = null;
          let status_color = null;
          let time_ago = h.time_ago;

          if (h.direction == "outgoing") {
            picture_url = h.profile.picture_url_dropbox;
            name = h.profile.name;
            url = "/profiles/" + h.profile.id;
          } else if (h.direction == "incoming" || h.direction == "accepted") {
            if (h.lead != null) {
              picture_url = h.lead.picture_url_dropbox;
              name = h.lead.first_name + " " + h.lead.last_name;
              url = "/leads/" + h.lead.id;
            } else if (h.company != null) {
              picture_url = h.company.picture_url_dropbox;
              name = h.company.name;
              url = "/companies/" + h.company.id;
            }
          }
          if (h.direction == "incoming" || h.direction == "outgoing") {
            body = h.simplified_body;
          } else if (h.direction == "accepted") {
            body = "------- accepted --------";
          }

          if (h.status == "pending") {
            status_icon = "icon-time";
            status_color = "gray";
          } else if (h.status == "running") {
            status_icon = "icon-play";
            status_color = "blue";
          } else if (h.status == "performed") {
            status_icon = "icon-ok";
            status_color = "green";
          } else if (h.status == "failed") {
            status_icon = "icon-warning-sign";
            status_color = "red";
          } else if (h.status == "aborted") {
            status_icon = "icon-remove";
            status_color = "gray";
          } else if (h.status == "canceled") {
            status_icon = "icon-ban-circle";
            status_color = "black";
          }
          // build html element
          html = "";
          html += "<section class='message-left'> ";
          html += "    <br/> ";
          html +=
            "    <div id='message_container" +
            i.toString() +
            "' name='message_container" +
            i.toString() +
            "' class='message_container'> ";
          //html += "        <input type='hidden' id='message_id"+i.toString()+"' name='message_id"+i.toString()+"' class='message_id' value='{messages.messages[].id}' /> ";
          html += "        <section class='row-fluid'> ";
          html += "            <div class='span1'> ";
          html +=
            "                <img id='m_sender_picture" +
            i.toString() +
            "' name='m_sender_picture" +
            i.toString() +
            "' class='m_sender-picture avatar' width='100%' src='" +
            picture_url +
            "' /> ";
          html += "            </div> ";
          html += "            <div class='span11'> ";
          html +=
            "                <p><a id='m_sender_name" +
            i.toString() +
            "' name='m_sender_name" +
            i.toString() +
            "' class='m_sender_name' style='font-weight:bold;' href='" +
            url +
            "'>" +
            name +
            "</a> | <span id='m_timeago" +
            i.toString() +
            "' name='m_timeago" +
            i.toString() +
            "' class='m_timeago' style='color:gray'>" +
            time_ago +
            " ago</span></p> ";
          html +=
            "                <p id='m_body" +
            i.toString() +
            "' name='m_body" +
            i.toString() +
            "' class='m_body'>" +
            body +
            "</p> ";
          html +=
            "                <p style='text-align:right;margin:0;padding:0;margin-right:15px;'> ";
          html +=
            "                    <span id='m_status" +
            i.toString() +
            "' name='m_status" +
            i.toString() +
            "' class='m_status' style='opacity:50%;color:" +
            status_color +
            "'><i class='" +
            status_icon +
            "'></i></span> ";
          html +=
            "                    <a id='m_details" +
            i.toString() +
            "' name='m_details" +
            i.toString() +
            "' class='m_details' href='/jobs/outreaches?id_outreach=" +
            h.id +
            "' target='window'><i class='icon-info-sign'></i></a> ";
          html += "                </p> ";
          html += "            </div> ";
          html += "        </section> ";
          html += "    </div> ";
          html += "</section> ";
          // append html element to list_div
          $("#outreaches_div").append(html);
        }

        // scroll to the bottom
        if (scroll_to_bottom) {
          let j = 0;
          let scroll_top = 0;
          let total_divs = $("#outreaches_div").children().length;
          while (j < total_divs) {
            let div0 = $("#message_container" + j);
            scroll_top = div0.offset().top - div0.height();
            j += 1;
          }
          if (scroll_top > 0) {
            $("#pool2_panel").scrollTop(scroll_top);
          }
        }

        // set innerText and href of a.lead_url inside div#lead_details
        let div = $("#lead_details");
        let h = json.data[0];

        // show header
        if (h.lead != null) {
          $(div).find("#lead_picture").attr("src", h.lead.picture_url_dropbox);
          $(div)
            .find("#lead_url")
            .attr("href", "/leads/" + h.lead.id);
          $(div)
            .find("#lead_name")
            .text(h.lead.first_name + " " + h.lead.last_name);
          $(div)
            .find("#lead_name")
            .attr("href", "/leads/" + h.lead.id);
        } else if (h.company != null) {
          $(div)
            .find("#lead_picture")
            .attr("src", h.company.picture_url_dropbox);
          $(div)
            .find("#lead_url")
            .attr("href", "/companies/" + h.company.id);
          $(div).find("#lead_name").text(h.company.name);
        }

        // refresh insights
        if (refresh_insights == true) {
          // Select the container to clear
          let insightsDiv = document.querySelector("#posts_div");

          // Clear all existing events
          insightsDiv.innerHTML = "";

          // Iterate over each event and create new elements
          json.events.forEach((event) => {
            // Create the event row
            const eventDiv = document.createElement("div");
            eventDiv.className = "row-fluid event";

            // Create the event time span
            const eventTimeSpan = document.createElement("span");
            eventTimeSpan.className = "event-time";
            eventTimeSpan.style.color = "gray";
            eventTimeSpan.textContent = timeAgo(event.create_time);

            // Create the badge span
            //const badgeSpan = document.createElement("span");
            //badgeSpan.className = "badge badge-black";
            //badgeSpan.innerHTML = `<i class='icon-circle' style='color:blue'></i> LinkedIn_PublicFeed`;

            // Create the live link
            const liveAnchor = document.createElement("a");
            liveAnchor.className = "btn btn-normal btn-link";
            liveAnchor.setAttribute("href", event.url);
            liveAnchor.setAttribute("target", "_window");
            liveAnchor.innerHTML = "view live";

            // Append event time and badge to the eventDiv
            eventDiv.appendChild(eventTimeSpan);
            //eventDiv.appendChild(document.createTextNode(" | "));
            //eventDiv.appendChild(badgeSpan);
            eventDiv.appendChild(document.createTextNode(" | "));
            eventDiv.appendChild(liveAnchor);

            // Create the event content container
            const eventContentDiv = document.createElement("div");
            eventContentDiv.className = "span12 event-content";

            // Create the content text as <pre>
            const contentPre = document.createElement("pre");
            contentPre.textContent = event.content;
            eventContentDiv.appendChild(contentPre);

            // Append pictures if any
            event.pictures.forEach((pictureUrl) => {
              const img = document.createElement("img");
              img.src = pictureUrl;
              eventContentDiv.appendChild(img);
            });

            // Append event content to the event row
            eventDiv.appendChild(eventContentDiv);

            // Append the whole event row to the insights div
            insightsDiv.appendChild(eventDiv);
          });
        }

        // To enable the expanding and collapsing functionality of the .event div when clicked.
        //
        // Add click event listener to all event divs.
        //
        document.querySelectorAll(".event").forEach(function (eventElement) {
          eventElement.addEventListener("click", function () {
            // Toggle the 'expanded' class to show/hide the full content
            eventElement.classList.toggle("expanded");
          });
        });

        // set hidden fields
        $(div).find("#outreach_type_selected").val(h.outreach_type);
        $(div).find("#id_profile_selected").val(h.profile.id);
        if (h.lead != null) {
          $(div).find("#id_lead_selected").val(h.lead.id);
        } else {
          $(div).find("#id_lead_selected").val("");
        }

        if (h.company != null) {
          $(div).find("#id_company_selected").val(h.company.id);
        } else {
          $(div).find("#id_company_selected").val("");
        }

        if (h.lead != null) {
          if (h.lead.job_title != null) {
            $(div).find("#lead_job_title").text(h.lead.job_title);
          } else {
            $(div).find("#lead_job_title").text("-");
          }

          if (h.lead.company != null) {
            $(div).find("#company_name").show();
            $(div).find("#company_name").text(h.lead.company.name);
            $(div)
              .find("#company_name")
              .attr("href", "/companies/" + h.lead.company.id);
          } else {
            $(div).find("#company_name").hide();
          }
        } else {
          $(div).find("#lead_job_title").text("-");
          $(div).find("#company_name").hide();
        }

        // set #lead_details 1.0 opacity amd enable mouse pointer events
        $("#lead_details").css("opacity", "1.0");
        $("#lead_details").css("pointer-events", "auto");

        // set #lead_details 1.0 opacity amd enable mouse pointer events
        $("#new_message_container").css("opacity", "1.0");
        $("#new_message_container").css("pointer-events", "auto");

        // set focus on #new_message_body, and select all text inside
        $("#new_message_body").focus();

        // after open a conversation, reload the list for update the unread messages
        loadList();
      }
    },
  });
}

// load list of latest incoming or accepted outreaches by doing a POST AJAX call to /ajax/unibox/list.json
function loadList() {
  // get the search query
  var q = $("#q").val();
  // get the page number
  var p = 1;
  // get the page size
  var z = 50;
  // get value of choosen option of select#id_tag
  var id_tag = $("#id_tag").val() == "" ? null : $("#id_tag").val();
  // get value of choosen option of select#id_profile
  var id_profile = $("#id_profile").val() == "" ? null : $("#id_profile").val();

  // show loading button
  //$('#list_div').html('<div style="text-align:center;"><img src="/images/loading.gif" /></div>');

  // do the AJAX call
  $.ajax({
    url: "/ajax/unibox/list.json",
    type: "POST",
    data: {
      q: q,
      p: p,
      z: z,
      id_tag: id_tag,
      id_profile: id_profile,
    },
    success: function (data) {
      // parse JSON response
      json = JSON.parse(data);
      // validate json status
      if (json.status != "success") {
        alert(json.status);
      } else {
        // hide loading button
        // clean previous content
        $("#list_div").html("");
        // iterate array json.data
        for (var i = 0; i < json.data.length; i++) {
          // get list
          let h = json.data[i];
          badge_color = "gray";
          badge_text = "";
          if (h.unread_messages > 0) {
            badge_color = "blue";
            badge_text = h.unread_messages.toString();
          }
          // create html elememt
          html = "";
          html +=
            "<div id='lead_container" +
            i.toString() +
            "' name='lead_container" +
            i.toString() +
            "' class='lead_container'>"; // onclick='alert(\"Click!!\")'>"
          html +=
            "<input type='hidden' id='id_profile" +
            i.toString() +
            "' name='id_profile" +
            i.toString() +
            "' class='id_profile' value='" +
            h.id_profile +
            "' />";

          if (h.id_lead != null) {
            html +=
              "<input type='hidden' id='id_lead" +
              i.toString() +
              "' name='id_lead" +
              i.toString() +
              "' class='id_lead' value='" +
              h.id_lead +
              "' />";
          } else {
            html +=
              "<input type='hidden' id='id_lead" +
              i.toString() +
              "' name='id_lead" +
              i.toString() +
              "' class='id_lead' value />";
          }

          if (h.id_company != null) {
            html +=
              "<input type='hidden' id='id_company" +
              i.toString() +
              "' name='id_company" +
              i.toString() +
              "' class='id_company' value='" +
              h.id_company +
              "' />";
          } else {
            html +=
              "<input type='hidden' id='id_company" +
              i.toString() +
              "' name='id_company" +
              i.toString() +
              "' class='id_company' value />";
          }

          html += "<section class='row-fluid'>";
          html += "    <div class='span3' style='position:relative;'>";
          html +=
            "        <img id='c_lead_picture" +
            i.toString() +
            "' name='c_lead_picture" +
            i.toString() +
            "' class='c_lead-picture avatar' width='64px' height='64px' src='" +
            h.lead_picture_url +
            "' />";
          html +=
            "        <div style='position:absolute;bottom:-5px;right:10px;'>";
          html +=
            "           <img id='c_channel_avatar" +
            i.toString() +
            "' name='c_channel_avatar" +
            i.toString() +
            "' class='c_channel-avatar avatar' width='24px' height='24px' src='" +
            h.channel_avatar_url +
            "' />";
          html += "        </div>";
          html += "    </div>";
          html += "    <div class='span9'>";
          html += "        <p>";

          if (h.id_lead != null) {
            html +=
              "            <a id='c_lead_name" +
              i.toString() +
              "' name='c_lead_name" +
              i.toString() +
              "' class='c_lead_name' href='/leads/" +
              h.id_lead +
              "'>" +
              h.lead_first_name +
              " " +
              h.lead_last_name +
              "</a>";
          } else if (h.id_company != null) {
            html +=
              "            <a id='c_company_name" +
              i.toString() +
              "' name='c_company_name" +
              i.toString() +
              "' class='c_company_name' href='/companies/" +
              h.id_company +
              "'>" +
              h.company_name +
              "</a>";
          }

          html +=
            "            <span style='color:wite;font-size:14px;width:50px;text-align:center;'>";
          //html += "                |"
          html += "            </span>";
          html +=
            "            <span id='c_unread_messages" +
            i.toString() +
            "' name='c_unread_messages" +
            i.toString() +
            "' class='c_unread_messages badge badge-" +
            badge_color +
            "'>" +
            badge_text +
            "</span>";
          html +=
            "            <span style='color:wite;font-size:14px;width:50px;text-align:center;'>";
          //html += "                |"
          html += "            </span>";
          html +=
            "            <a id='c_event" +
            i.toString() +
            "' name='c_event" +
            i.toString() +
            "' data-i='" +
            i.toString() +
            "' class='c_event btn btn-small btn-link' style='color:gray;'>view</a>";
          html += "            <br/>";
          html +=
            "            <span id='c_lead_job_title" +
            i.toString() +
            "' name='c_lead_job_title" +
            i.toString() +
            "' class='c_lead_job_title' style='color:gray'>" +
            h.lead_job_title +
            "</span>";
          html += "            <br/>";
          html +=
            "            <span id='c_timeago" +
            i.toString() +
            "' name='c_timeago" +
            i.toString() +
            "' class='c_timeago' style='color:gray'>" +
            h.last_outreach_time_ago +
            " ago</span>";

          if (h.id_lead != null) {
            html += "                | ";
            if (h.lead_linkedin) {
              html +=
                "            <a id='c_linkedin" +
                i.toString() +
                "' name='c_linkedin" +
                i.toString() +
                "' class='c_linkedin' style='margin-left:5px;color:gray' href='" +
                h.lead_linkedin +
                "' target='window'><i class='icon-linkedin'></i></a>";
            }

            if (h.lead_facebook) {
              html +=
                "            <a id='c_facebook" +
                i.toString() +
                "' name='c_facebook" +
                i.toString() +
                "' class='c_facebook' style='margin-left:5px;color:gray' href='" +
                h.lead_facebook +
                "' target='window'><i class='icon-facebook'></i></a>";
            }

            if (h.lead_email) {
              html +=
                "            <a id='c_email" +
                i.toString() +
                "' name='c_email" +
                i.toString() +
                "' class='c_email' style='margin-left:5px;color:gray' href='mailto:" +
                h.lead_email +
                "' target='window'><i class='icon-envelope'></i></a>";
            }

            if (h.lead_phone) {
              html +=
                "            <a id='c_phone" +
                i.toString() +
                "' name='c_phone" +
                i.toString() +
                "' class='c_phone' style='margin-left:5px;color:gray' href='tel:" +
                h.lead_phone +
                "' target='window'><i class='icon-phone'></i></a>";
            }
          } else if (h.id_company != null) {
            html += "                | ";
            if (h.company_linkedin) {
              html +=
                "            <a id='c_linkedin" +
                i.toString() +
                "' name='c_linkedin" +
                i.toString() +
                "' class='c_linkedin' style='margin-left:5px;color:gray' href='" +
                h.company_linkedin +
                "' target='window'><i class='icon-linkedin'></i></a>";
            }

            if (h.company_facebook) {
              html +=
                "            <a id='c_facebook" +
                i.toString() +
                "' name='c_facebook" +
                i.toString() +
                "' class='c_facebook' style='margin-left:5px;color:gray' href='" +
                h.company_facebook +
                "' target='window'><i class='icon-facebook'></i></a>";
            }

            if (h.company_email) {
              html +=
                "            <a id='c_email" +
                i.toString() +
                "' name='c_email" +
                i.toString() +
                "' class='c_email' style='margin-left:5px;color:gray' href='mailto:" +
                h.company_email +
                "' target='window'><i class='icon-envelope'></i></a>";
            }

            if (h.company_phone) {
              html +=
                "            <a id='c_phone" +
                i.toString() +
                "' name='c_phone" +
                i.toString() +
                "' class='c_phone' style='margin-left:5px;color:gray' href='tel:" +
                h.company_phone +
                "' target='window'><i class='icon-phone'></i></a>";
            }
          }

          html += "        </p>";
          html += "    </div>";
          html += "</section>";
          html += "</div>";
          // append html element to list_div
          $("#list_div").append(html);
        }

        // update the #page_number
        $("#page_number").html(json.page_number);

        // update the #total_pages
        $("#total_pages").html(json.total_pages);

        // set the #next button in readonly
        if (p >= json.total_pages) {
          $("#next").attr("disabled", "disabled");
          $("#next").attr("href", "/unibox?p=" + p);
        } else {
          $("#next").removeAttr("disabled");
          $("#next").attr("href", "/unibox?p=" + (p + 1));
        }

        // set the #prev button in readonly
        if (p <= 1) {
          $("#prev").attr("disabled", "disabled");
          $("#prev").attr("href", "/unibox?p=1");
        } else {
          $("#prev").removeAttr("disabled");
          $("#prev").attr("href", "/unibox?p=" + (p - 1));
        }

        // set event when click on a div.lead_container
        // problem: jquery event on dynamically created element
        // solution: https://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements
        //
        $("div.lead_container").on("click", function () {
          let id_profile = $(this).find(".id_profile").val();
          let id_lead = $(this).find(".id_lead").val();
          let id_company = $(this).find(".id_company").val();
          let scroll_to_bottom = true;
          let refresh_insights = true;
          loadOutreaches(
            id_profile,
            id_lead,
            id_company,
            scroll_to_bottom,
            refresh_insights
          );
        });
      }
    },
  });
}

// on page load
$(document).ready(function () {
  init_search("/unibox");

  // set div#lead_details 0.2 opacity
  $("div#lead_details").css("opacity", "0.2");
  $("div#lead_details").css("pointer-events", "none");

  // set #new_message_container 0.2 opacity and readonly
  $("#new_message_container").css("opacity", "0.2");
  $("#new_message_container").css("pointer-events", "none");

  // when select an option inside #id_tag, redirect to /leads?id_tag=...
  // the value of id_tag is in the select #id_tag
  $("#id_tag").change(function () {
    // get the value of the select #id_tag
    let id_tag = $("#id_tag").val();
    // redirect to /leads?id_tag=...
    window.location.href = "/unibox?id_tag=" + id_tag;
  });

  // when select an option inside #id_profile, redirect to /leads?id_profile=...
  // the value of id_profile is in the select #id_profile
  $("#id_profile").change(function () {
    // get the value of the select #id_profile
    let id_profile = $("#id_profile").val();
    // redirect to /leads?id_profile=...
    window.location.href = "/unibox?id_profile=" + id_profile;
  });

  // when click on #new_message_button, call the method push_outreach
  $("#new_message_button").on("click", function () {
    let outreach_type = $("#outreach_type_selected").val();
    let id_profile = $("#id_profile_selected").val();
    let id_lead = $("#id_lead_selected").val();
    let id_company = $("#id_company_selected").val();
    let body = $("#new_message_body").val();
    pushOutreach(outreach_type, id_profile, id_lead, id_company, body);
  });

  // when press keypress on #new_message_body, call the method push_outreach
  $("#new_message_body").keypress(function (event) {
    // if the key pressed is ENTER
    if (event.ctrlKey && event.which == 10) {
      $("#new_message_button").click();
    }
  });

  // load list of latest incoming or accepted outreaches
  loadList();

  // refresh list and outreaches every few seconds
  setInterval(function () {
    //setTimeout(function() {
    loadList();
    let id_profile = $("#id_profile_selected").val();
    let id_lead = $("#id_lead_selected").val();
    let id_company = $("#id_company_selected").val();
    let scroll_to_bottom = false;
    let refresh_insights = false;
    if (id_profile != "" && (id_lead != "" || id_company != "")) {
      loadOutreaches(
        id_profile,
        id_lead,
        id_company,
        scroll_to_bottom,
        refresh_insights
      );
    }
  }, 5000);

  $(".expand-pool1").on("click", function () {
    $(".pool1").addClass("expanded").removeClass("collapsed");
    $(".pool2").addClass("collapsed").removeClass("expanded");
    $(".pool3").addClass("collapsed").removeClass("expanded");
  });

  $(".expand-pool2").on("click", function () {
    $(".pool1").addClass("collapsed").removeClass("expanded");
    $(".pool2").addClass("expanded").removeClass("collapsed");
    $(".pool3").addClass("collapsed").removeClass("expanded");
  });

  $(".expand-pool3").on("click", function () {
    $(".pool1").addClass("collapsed").removeClass("expanded");
    $(".pool2").addClass("collapsed").removeClass("expanded");
    $(".pool3").addClass("expanded").removeClass("collapsed");
  });

  // Optional: Automatically collapse sections on small screens
  function checkWindowSize() {
    if ($(window).width() <= 1200) {
      // Adjust the size based on your design needs
      if (
        !$("#pool1").hasClass("expanded") &&
        !$("#pool2").hasClass("expanded") &&
        !$("#pool3").hasClass("expanded")
      ) {
        // If none are expanded, expand pool1 by default
        $("#pool1").addClass("expanded").removeClass("collapsed");
      }
    }
  }

  // Check window size on load and resize
  checkWindowSize();
  $(window).resize(function () {
    checkWindowSize();
  });
});

//applyReadMore();

showWait("Loading... ");

// function to update the credits in the header. TODO: move this to the I2P module
// call ajax /ajax/i2p/get_credits.json, and update the credits in the header
function i2p_update_header(service) {
  $.ajax({
    url: "/ajax/i2p/get_credits.json",
    type: "POST",
    data: { service: service },
    dataType: "json",
    success: function (data) {
      if (data.status == "success") {
        $("#credits").html(data.credits);
      } else {
        alert(
          "Error Ocurrend when Updating the Credits in the Header: " +
            data.status
        );
      }
    },
    error: function (data) {
      alert(
        "Unkown Error Ocurrend when Updating the Credits in the Header: " +
          data.status
      );
    },
  });
}

// overload the onload event in order to
// hide the "Loading..." message when the
// onload event has done.
var old_onload = window.onload;
window.onload = function () {
  // execute redirection when click on a button.btn-link with an href attribute
  $(".btn-link").click(function () {
    // if the button is not disabled and if it has an href attribute
    if (!$(this).attr("disabled") && $(this).attr("href")) {
      window.location.href = $(this).attr("href");
    }
  });

  // making it responsive
  if ($(window).width() < 485) {
    // top bar responsive - hide service name if wdith < 485
    $("header").find("#service_name").remove();
    $("header").find("#services").width("16px");

    // top bar responsive - hide the 'email support' label
    $("header").find("#email_support").remove();

    // top bar responsive - hide left bar if width < 485
    $("#left-panel-content").remove();
  } else {
    $("header").find("#services").width("125px");
  }

  // call the original onload function
  if (typeof old_onload == "function") {
    old_onload();
  }

  // setup smooth scrolling, fiexd top navbar, fixed left bar
  //ajaxStatus.setup();

  // enable select-all-text when focus on any input with class `select-all-on-focus`
  enableSelectAllTextOnFocus();

  // apply tooltips
  applyToolTips();

  // if user press ESC, then I close any popup
  $(".popup").keydown(function (event) {
    if (event.key == "Escape") {
      $(".popup").hide("fade");
    }
  });

  // if click on this button, then I close any popup
  $(".popup .cancel-button").click(function () {
    $(".popup").hide("fade");
  });

  // hide the "Loading..." message
  if (hide_loading_message_after_page_load == true) {
    hideWait();
  }
};
