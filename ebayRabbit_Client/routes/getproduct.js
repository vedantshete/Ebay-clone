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

exports.getproduct = function(req,res) {

	var msg_payload = {"email": req.session.email};
	mq_client.make_request('getproduct_queue', msg_payload, function (err, results) {
		if(err){
			throw err;
		}
		else
		{
			console.log("Getting products for homepage "+results);
			res.send(results);
		}

	})
};

exports.getMyAds = function(req,res) {

	var msg_payload = {"email": req.session.email};
	mq_client.make_request('myAds_queue', msg_payload, function (err, results) {
		if (err) {
			throw err;
		}
		else {
			console.log("Getting your ads " + results);
			res.send(results);
		}
	});
};


exports.myAds = function(req, res){
	logger.log('info', "User with email "+req.session.email+" checking the ads they posted");
	console.log("in homepage");
	res.render('myAds');
	}

exports.homepage = function(req, res){
	console.log("in homepage");
	logger.log('info', "User with email "+req.session.email+" at homepage");
	res.render('homepage');
	}