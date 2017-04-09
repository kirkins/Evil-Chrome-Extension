var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var vogels = require('vogels')
const Joi = require('joi');
vogels.AWS.config.loadFromPath('credentials.json');

var Visit = vogels.define('Visit', {
  hashKey : 'time',
  tableName: 'Logger',

  // add the timestamp attributes (updatedAt, createdAt)
  timestamps : true,

  schema : {
    time : Joi.number(),
    url : Joi.string(),
    keylog : Joi.string()
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;
var router = express.Router();

router.post('/track', function(req, res) {
  // Use req.body here for session data
  console.log(req.body);

Visit.create(req.body, function (err, acc) {
  console.log(acc);
  console.log(err);
  //console.log('created account in DynamoDB', acc.get('time'));
});

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
