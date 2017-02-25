/**
 * Created by vedantshete on 11/2/16.
 */
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function sellitem(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');

        product.insert({
            "name": msg.name,
            "description": msg.description,
            "price": msg.price,
            "quantity": msg.quantity,
            "isCreated":msg.isCreated,
            "isStopped":null,
            "shippedfrom":msg.shippedfrom,
            "seller_email":msg.email,
            "buyer_email":null,
            "forBid":0
        }, function (err, user) {
            if (user) {
                console.log("Product registered");
                //alert("Your product has been posted!");
                callback(null, res);
            } else {
                console.log("Error while posting ad");
                callback(null, res);
            }

        })

    })
};
exports.sellitem = sellitem;


function postbid(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');

        product.insert({
            "name": msg.name,
            "description": msg.description,
            "price": msg.price,
            "quantity": msg.quantity,
            "isCreated": msg.isCreated,
            "isStopped": msg.isCreated+345600000,
            "shippedfrom": msg.shippedfrom,
            "seller_email": msg.email,
            "buyer_email":null,
            "forBid":1
        }, function (err, user) {
            if (user) {

                console.log("Product registered");
                //alert("Your product has been posted!");
                callback(null, res);
            } else {
                console.log("returned false");
                console.log("Error in registering user");
                callback(null, res);
            }

        })

    })
};
exports.postbid = postbid;