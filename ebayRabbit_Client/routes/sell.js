var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";
var winston = require('winston');
var moment = require('moment');
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

exports.sellitem = function(req,res){
	var name = req.param("name");
	var description = req.param("description");
	var price = req.param("price");
	var quantity = req.param("quantity");
	var isCreated=Date.now()/1000;
	var shippedfrom = req.param("shippedfrom");

    var msg_payload = {"email": req.session.email, "name":name, "description":description, "price":price, "quantity":quantity,
    "isCreated":isCreated,"shippedfrom":shippedfrom};
    mq_client.make_request('sellitem_queue', msg_payload, function (err, results) {
        if(err){
            throw err;
        }
        else
        {
            logger.log('info', "User with email: "+req.session.email+" posting product ad for selling");
            console.log("User selling product "+results);
            res.render('homepage');
        }

    })
};

exports.postbid = function(req,res) {
    var name = req.param("name");
    var description = req.param("description");
    var price = req.param("price");
    var isCreated = Date.now() / 1000;
    var quantity = req.param("quantity");
    var shippedfrom = req.param("shippedfrom");

    var msg_payload = {"email": req.session.email, "name":name, "description":description, "price":price, "quantity":quantity,
        "isCreated":isCreated,"shippedfrom":shippedfrom};
    mq_client.make_request('postbid_queue', msg_payload, function (err, results) {
        if(err){
            throw err;
        }
        else
        {
            bidlog.log('info', "User with email: "+req.session.email+" posting product ad for bidding");
            console.log("User selling product "+results);
            res.render('homepage');
        }

    })
};


exports.sell = function(req,res){
	res.render('sell');
}