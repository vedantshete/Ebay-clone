/**
 * Created by vedantshete on 11/1/16.
 */
var winston = require('winston');
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function getproduct(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');

        product.find({seller_email: {$ne: msg.email}}).toArray(function (err, product) {
            if (product) {
                console.log("Getting products for homepage");
                //console.log(product);
                callback(null, product);
            }
            else {
                console.log("Error");
                callback(null, res);
            }
        });
    })
}
exports.getproduct = getproduct;


function myAds(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');
        console.log(msg.email);
        product.find({seller_email:msg.email}).toArray(function(err, product){
            if(product) {
                console.log("Getting your ads "+product);
                callback(null, product);
            }
            else{
                console.log("Error");
                callback(null, res);
            }
        })
    })
}
exports.myAds = myAds;