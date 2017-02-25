var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";

var mq_client = require('../rpc/client');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.logininfo = function(req, res){

    var msg_payload = {"email": req.session.email};
    mq_client.make_request('logininfo_queue', msg_payload, function (err, results) {
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


exports.getlogininfo = function(req,res){
	logger.log('info', "User with email: "+req.session.email+" checking their login info");
	res.render('logininfo');
};