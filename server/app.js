var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var vogels = require('vogels')
const Joi = require('joi');
vogels.AWS.config.loadFromPath('credentials.json');

var Visit = vogels.define('Visit', {
  hashKey: 'time',
  tableName: 'Logger',
  timestamps: true,

  schema: {
    user: Joi.string(),
    time: Joi.number(),
    url: Joi.string(),
    keylog: Joi.string()
  }
});

var User = vogels.define('User', {
  hashKey: 'id',
  tableName: 'User',
  timestamps: true,

  schema: {
    id: Joi.string(),
    lang: Joi.string(),
    agent: Joi.string(),
    timezone: Joi.number()
  }
});

var Map = vogels.define('Map', {
  hashKey: 'time',
  tableName: 'Map',
  timestamps: true,

  schema: {
    user: Joi.string(),
    time: Joi.number(),
    latitude: Joi.number(),
    longitude: Joi.number()
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;
var router = express.Router();

router.post('/track', function(req, res) {
  Visit.create(req.body, function (err, acc) {
    console.log(acc);
    console.log(err);
  });
  res.json({ message: 'data recieved' });
});

router.post('/user', function(req, res) {
  User.create(req.body, function (err, acc) {
    console.log(acc);
    console.log(err);
  });
  res.json({ message: 'data recieved' });
});

router.post('/map', function(req, res) {
  Map.create(req.body, function (err, acc) {
    console.log(acc);
    console.log(err);
  });
  res.json({ message: 'data recieved' });
});

app.use('/api/v1', router);

app.listen(port);
console.log('Magic happens on port ' + port);
