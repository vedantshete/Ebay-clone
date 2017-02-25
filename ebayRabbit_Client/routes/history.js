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


exports.getbought=function(req,res) {

    var msg_payload = {"email": req.session.email};
    mq_client.make_request('getbought_queue', msg_payload, function (err, results) {
        if(err){
            throw err;
        }
        else
        {
            console.log("Getting your profile "+results);
            res.send(results);
        }

    })
};


exports.getsold=function(req,res){

    var msg_payload = {"email": req.session.email};
    mq_client.make_request('getsold_queue', msg_payload, function (err, results) {
        if(err){
            throw err;
        }
        else
        {
            console.log("Getting your profile "+results);
            res.send(results);
        }

    })
};


exports.mysold=function(req,res){
	logger.log('info', "User with email: "+req.session.email+" checking products they have sold");
	console.log("Rendering sold page");
    res.render("sold");
};

exports.mybought = function(req, res){
	logger.log('info', "User with email: "+req.session.email+" checking products they bought");
    console.log("Rendering bought page");
    res.render("bought");
};