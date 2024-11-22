window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-XHCG5LE744");

//////////////////////////////////////////////////////////

DEMO_CURRENT_THEME = "black-blue";
/*
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
*/

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

    if (arrow1) arrow1.style.display = "none";
    if (arrow2) arrow2.style.display = "none";
    if (arrow3) arrow3.style.display = "none";
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

