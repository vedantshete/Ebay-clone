/**
 * Created by vedantshete on 11/2/16.
 */
var winston = require('winston');
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function addcart(msg, callback) {
    var res = {};

    mongo.connect(mongoURL, function (err, db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = db.collection('cart');

        cart.insert({
            "_id": msg.productid,
            "name": msg.name,
            "price": msg.price,
            "quantityincart": msg.quantityincart,
            "total": msg.total,
            "quantity": msg.quantity,
            "buyer_email": msg.buyer_email
        }
            , function (err, cart) {
            if (cart) {
                console.log("Product added to cart");
                callback(null, res);
            } else {
                console.log("Error occurred");
                callback(null, res);
            }
        })
    })
};
exports.addcart = addcart;