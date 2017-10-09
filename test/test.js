var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = express();

var uri = 'http://localhost:3000';

describe('Accounts',function(){

    it('Should return user Transaction ID and Permanent Account Number',function(done){
        app.get(uri + '/accountinformation/?AccountNumber='+100+'&SortCode='+49).end(function(err,res){

                var body = res.body;

                expect(data.Transactions.TransactionId).to.equal('X');
                expect(data.Transactions.PermanentAccountNumber).to.equal('X');
                
            });
    });
});