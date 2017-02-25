var winston = require('winston');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";
var mq_client = require('../rpc/client');


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayLog.log' })
    ]
});

var bidlog = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayBidLog.log' })
    ]
});

exports.productdetail = function(req, res){
    //var productid = require('mongodb').ObjectId(req.param("productid"));
    var productid = req.param("productid");
    var msg_payload = {"productid":productid};
    mq_client.make_request('productdetail_queue', msg_payload, function (err, products) {
        if(err){
            throw err;
        }
        else
        {
            logger.log('info', "User with email: "+req.session.email+" checking product info");
            console.log("Getting product detail "+products);
            res.render('productdetail', {product: products});
        }
    })
};


exports.productbid = function(req, res) {
    var productid = req.param("productid");
    var msg_payload = {"productid":productid};
   // var productid = require('mongodb').ObjectId(req.param("productid"));

    mq_client.make_request('productbid_queue', msg_payload, function (err, products) {
        if(err){
            throw err;
        }
        else
        {
            bidlog.log('info', "User with email: "+req.session.email+" checking product for bid");
            console.log("Getting product detail "+products);
            res.render('productbid', {product: products});
        }
    })
};
