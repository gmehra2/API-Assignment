const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const rp = require('request-promise');

const app = express();
let db;

const thirdPartyOptions = {
  uri: 'https://jsonplaceholder.typicode.com/posts/1',
  json: true
};

const getResponseObject = (data, error = null) => ({
  data,
  error
});

app.get('/accountInformation', (req, res) => {
  const { AccountNumber, SortCode } = req.query;

  if (!AccountNumber) {
    return res.json(getResponseObject(null, 'Account Number is Missing'));
  }

  if (!SortCode) {
    return res.json(getResponseObject(null, 'Sort Code is Missing'));
  }

  const accountInformationPromise = db
    .collection('lloyds')
    .find({ "Transactions.AccountNumber": AccountNumber, "Transactions.SortCode": SortCode})
    .toArray();

  const thirdPartyPromise = rp(thirdPartyOptions);

  Promise.all([accountInformationPromise, thirdPartyPromise])
    .then(([accountInformationResult, thirdPartyResult]) =>
      res.json(
        getResponseObject({
          Transactions: accountInformationResult,
          ThirdPartyOutput: thirdPartyResult
        })
      )
    )
    .catch(err => {
      console.error(error);

      res.json(getResponseObject(null, error));
    });
});

MongoClient.connect('mongodb://localhost:27017/llyods', (error, database) => {
  if (error) {
    throw error;
  }

  db = database;

  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000');
  });
});
