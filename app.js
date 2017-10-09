
var express = require('express');

var rp = require('request-promise');

 var MongoClient = require('mongodb').MongoClient;


var app = express();
var mc=MongoClient();

var db = null // global variable to hold the connection


MongoClient.connect("mongodb://localhost:27017/lloyds", function(err, database) {
        if (!err) {
            console.log("We are connected");
            db = database

            

        } else
            console.log(err);
    });



app.get('/', function (req,res) {
   res.send('Hello');
});

app.get('/accountInformation', function (req, res) {

var _req$query = req.query,
    AccountNumber = _req$query.AccountNumber,
    SortCode = _req$query.SortCode;


 if (!AccountNumber) {
    res.send('Account Number is Missing');
  }

  if (!SortCode) {
    res.send('Sort Code is Missing');
  }


  var accountInformationPromise = 
  db.collection('lloyds').find({ "Transactions.AccountNumber": AccountNumber, "Transactions.SortCode": SortCode}).toArray();
  console.log(accountInformationPromise);
   res.send('Hello Account Welcome21'+accountInformationPromise);
});

 app.listen(3000);
