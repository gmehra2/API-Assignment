var request = require('supertest');
var express = require('express');
var app = express();

var uri = 'http://localhost:3000';

describe('Accounts',function(){
	const response = { Transaction: { TransactionId: 'X', PermanentAccountNumber: 'X' } };
	
	app.get('/accountInformation', function (req, res) {
		res.status(200).send(response);
    });

    it('Should return user Transaction ID and Permanent Account Number', function(done) {
		request(app)
		.get('/accountInformation')
		.expect(200, response, done);
    });
});

