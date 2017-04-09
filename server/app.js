var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;
var router = express.Router();

router.post('/track', function(req, res) {
  // Use req.body here for session data
  console.log(req.body);
  res.json({ message: 'data recieved' });
});

router.post('/geo', function(req, res) {
  // Use req.body for location data
  console.log(req.body);
  res.json({ message: 'data recieved' });
});

app.use('/api/v1', router);

app.listen(port);
console.log('Magic happens on port ' + port);
