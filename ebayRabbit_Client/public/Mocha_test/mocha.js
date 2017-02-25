var express = require('express');
var request = require('request');
var assert = require('assert');
var http = require('http');
var mocha = require('mocha');

it('the user should login with the right credentials', function(done) {
    http.get('http://localhost:3000/sell', function (res) {
        console.log(res);
        assert.equal(200, res.statusCode);
        done();
    });
});

it('Test signup page', function (done) {
    http.get('http://localhost:3000/homepage', function (res) {
        console.log(res);
        assert.equal(200, res.statusCode);
        done();
    });
});

it('Test login info', function (done) {
    http.get('http://localhost:3000/logininfo', function (res) {
        assert.equal(200, res.statusCode);
        done();
    });
});

it('Test profile page', function (done) {
    http.get('http://localhost:3000/profile', function (res) {
        assert.equal(200, res.statusCode);
        done();
    });
});

it('Test my advertisements', function (done) {
    http.get('http://localhost:3000/myAds', function (res) {
        assert.equal(200, res.statusCode);
        done();
    });
});
