/**
 * Created by vedantshete on 10/25/16.
 */
var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";
var mq_client = require('../rpc/client');

var bidlog = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayBidLog.log' })
    ]
});

exports.placebid = function(req, res){
    var product_id = req.param("product_id");
    //var id = new ObjectId(product_id);
    var bid = req.param("bid");
    console.log(product_id+" "+bid);

    var msg_payload = {"buyer_email":req.session.email, "productid": product_id, "price":bid};
    mq_client.make_request('placebid_queue', msg_payload, function (err, products) {
        if(err){
            console.log("Error occurred");
        }
        else
        {
            bidlog.log('info', "User with email: "+req.session.email+" placing bid on product");
            console.log("Bid placed");
            res.render('homepage');
        }
    })
};

