var winston = require('winston');
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";
var mq_client = require('../rpc/client');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.ended=function(req,res){

    var msg_payload = {"buyer_email":req.session.email};
    mq_client.make_request('payment_queue', msg_payload, function (err, products) {
        if(err){
            console.log("Error occurred");
        }
        else
        {
            console.log("Payment successful");
            res.render('homepage');
        }
    })
};

