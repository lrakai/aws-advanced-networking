var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
  , ObjectId = require('mongodb').ObjectId;

var dbConnectionString = process.env.DB_CONNECTION_STRING ? process.env.DB_CONNECTION_STRING : 'mongodb://localhost:27017/accumulator';
var db;

process.title = "aan-api";

var environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
environment = environment.trim();
console.log('NODE_ENV: ' + environment);

var app = express();

function dbConnect() {
  MongoClient.connect(dbConnectionString, function (err, mongoDb) {
    if (null == err) {
      console.log("Connected to database");

      db = mongoDb;
      db.on('reconnect', function() {
        console.log("Reconnected to database.");
      })
    } else {
      console.log("Couldn't connect to database.  Retrying shortly...")
      setTimeout(dbConnect, 2000);
    }
  });
}

dbConnect();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var insertDocument = function (db, document, callback) {
  var collection = db.collection('documents');
  collection.insertOne(document, function (err, result) {
    callback(err, JSON.stringify(result.ops[0]));
  });
};

var updateDocument = function (db, document, callback) {
  document._id = ObjectId(document._id);
  var collection = db.collection('documents');
  collection.replaceOne({ "_id": document._id }, document, function (err, result) {
    callback(err, JSON.stringify(result.ops[0]));
  });
};

var findAllDocuments = function (db, callback) {
  var collection = db.collection('documents');
  collection.find({}).toArray(function (err, result) {
    if (result) {
      result = result.reverse();
    }
    callback(err, result);
  });
}

// Insert message
app.post('/api', function (req, res) {
  var data = req.body;
  insertDocument(db, data, function (err, result) {
    res.status(201).send(result)
  })
});

// Update message
app.put('/api', function (req, res) {
  var data = req.body;
  updateDocument(db, data, function (err, result) {
    res.status(200).send(result)
  })
});

// Get messages
app.get('/api', function (req, res) {
  findAllDocuments(db, function (err, result) {
    res.send(result);
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
