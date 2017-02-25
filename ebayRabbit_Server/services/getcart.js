/**
 * Created by vedantshete on 11/2/16.
 */
var winston = require('winston');
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";


function removeitem(msg, callback) {
    var res = {};

    mongo.connect(mongoURL, function (err, db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = db.collection('cart');

        cart.remove({_id:msg.productid, buyer_email: msg.buyer_email});
        callback(null, res);
    })
};
exports.removeitem = removeitem;


function getcart(msg, callback) {
    var res = {};

    mongo.connect(mongoURL, function (err, db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = db.collection('cart');
        cart.find({buyer_email: msg.buyer_email}).toArray(function (err, product) {
            if (product) {
                console.log("Products in cart "+product);
                callback(null, product);
            } else {
                console.log("Error occurred");
                callback(null, res);
            }
        })
    })
};
exports.getcart = getcart;


function checkout(msg, callback) {
    var res = {};

    mongo.connect(mongoURL, function (err, db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = db.collection('cart');
        cart.update({_id: msg.productid, buyer_email:msg.buyer_email},
            {
                $set: {
                    "quantityincart": msg.quantityincart
                }
            }, {upsert: true},
            function (err, user) {
                if (user) {
                    callback(null, res);
                } else {
                    console.log("Error occured");
                    callback(null, res);
                }

            }
        );
    })
};
exports.checkout = checkout;