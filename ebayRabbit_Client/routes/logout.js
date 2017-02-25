var moment = require('moment');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";
var winston = require('winston');
var mq_client = require('../rpc/client');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.logout = function(req,res){
	var lastlogin = moment().format('LLLL');

    var msg_payload = {"email": req.session.email, "lastlogin": lastlogin};
    mq_client.make_request('logout_queue', msg_payload, function (err, results) {
        if(err){
            throw err;
        }
        else
        {
            logger.log('info', "User with email: "+req.session.email+" logged out");
            console.log("Getting your profile "+results);
            req.session.destroy();
            res.render('signin');
        }

    })

};