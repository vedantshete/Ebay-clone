/**
 * Created by vedantshete on 11/2/16.
 */
var winston = require('winston');
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function getbought(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');

        product.find({buyer_email: msg.email}).toArray(function (err, results) {
            if (err) {
                console.log("In error");
                callback(null, res);
            } else {
                callback(null, results);
            }
        });
    })
}
exports.getbought = getbought;


function getsold(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');

        product.find({"buyer_email":{$ne:null} ,"seller_email":msg.email}).toArray(function (err, results) {
            if (err) {
                console.log("In error");
                callback(null, res);
            } else {
                callback(null, results);
            }
        });
    })
}
exports.getsold = getsold;