/**
 * Created by vedantshete on 11/2/16.
 */
var winston = require('winston');
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function productdetail(msg, callback){
    var res = {};

    console.log("Product id is "+msg.productid);
    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');
        var productid = require('mongodb').ObjectId(msg.productid);
        product.find({_id: productid}).toArray(function (err, products) {
            if (products) {
                console.log("Getting product detail page");
                console.log("here they are "+products);
                callback(null, products);
            }
            else {
                console.log("Getting Error");
                callback(null, res);
            }
        });
    })
}
exports.productdetail = productdetail;


function productbid(msg, callback){
    var res = {};

    console.log("Product id is "+msg.productid);
    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');
        var productid = require('mongodb').ObjectId(msg.productid);
        product.find({_id: productid}).toArray(function (err, products) {
            if (products) {
                console.log("Getting product bid page");
                console.log("here they are "+products);
                callback(null, products);
            }
            else {
                console.log("Getting Error");
                callback(null, res);
            }
        });
    })
}
exports.productbid = productbid;