var bcrypt = require('bcrypt-nodejs');
var winston = require('winston');
var moment = require('moment');
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

exports.check=function(req,res) {
    var email = req.param("email");
    var password = req.param("password");
    var result;
    logger.log('info', 'User trying to login in');
    var msg_payload={ "email": email, "password": password };
    mq_client.make_request('login_queue',msg_payload, function(err,results){
    console.log(email + password);
    req.session.email = email;
        console.log("Hi "+results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("Here is the result from queue: "+results);
                console.log("valid Login");
                res.send(results);

            }
            else {
                console.log("invalid Login");
                res.send(results);

            }
        }

    });
};

	exports.reg=function(req,res) {
        logger.log('info', "User registering");
        var firstname = req.param("firstname");
        var lastname = req.param("lastname");
        var email = req.param("email");
        var pass = req.param("password");
        req.session.email = email;
        //req.session.email = email;
        //var crypted = bcrypt.hashSync(pass);
        //console.log(crypted);
        console.log(email);
        var msg_payload={ "firstname":firstname, "lastname":lastname, "email":email, "password":bcrypt.hashSync(pass)};
        mq_client.make_request('register_queue',msg_payload, function(err,results){
            console.log(results);

            if(err){
                console.log("Error occurred");
            }else{
                res.render('register1');
            }

    })
    };

	exports.reg1=function(req,res) {
        console.log("register node.js");
        var birthday = req.param("birthday");
        var handle = req.param("handle");
        var mobile = req.param("mobile");
        var place = req.param("place");
        var email = req.session.email;
        console.log(email);
        var msg_payload={ "email": req.session.email ,"birthday":birthday, "handle":handle, "mobile":mobile, "place":place};
        mq_client.make_request('register1_queue',msg_payload, function(err,results) {
            if(err){
                console.log("Error occurred");
            }else{
                console.log("User successfully registered");
                res.render('signin');
            }

        })
    };

    // exports.emailnotreg = function(req, res){
		// console.log("checking if email is registered: node");
		// var email = req.param("email");
    //
    //     mongo.connect(mongoURL, function () {
    //         console.log('Connected to mongo at: ' + mongoURL);
    //         var user = mongo.collection('user');
    //
    //         user.find({"email":email}), function (err, result) {
    //             if (result) {
    //
    //                 result = {"statusCode":202};
    //                 res.send(result);
    //             }
    //             else{
    //
    //                 result = {"statusCode":405};
    //                 res.send(result);
    //             }
    //
    //         }
    //     });
    // };



                // exports.emailreg = function(req, res) {
                //     var email = req.param("email");
                //     console.log(email);
                //     mongo.connect(mongoURL, function () {
                //         console.log('Connected to mongo at: ' + mongoURL);
                //         var user = mongo.collection('user');
                //
                //         user.find({"email":email}), function (err, result) {
                //             if (result) {
                //
                //                 result = {"statusCode":405};
                //                 res.send(result);
                //             }
                //             else{
                //                 console.log(result + " Hi");
                //                 result = {"statusCode":202};
                //                 res.send(result);
                //             }
                //
                //         }
                //     });
                // };



							exports.check_handle = function(req, res){
								console.log("checking that handle is not registered: node");
								var handle = req.param("handle");

                                mongo.connect(mongoURL, function () {
                                    console.log('Connected to mongo at: ' + mongoURL);
                                    var user = mongo.collection('user');

                                    user.find({handle:handle}, function (err, user) {
                                        if (user.length>0) {
                                            console.log("Handle already registered");
                                            result = {"statusCode": 403};
                                            res.send(result);
                                        }
                                        else {
                                            result = {"statusCode": 200};
                                            res.send(result);
                                        }

                                    })
                                });

										};


setInterval(function () {
    console.log('second passed');
    var timenow=Date.now()/1000;
    console.log(timenow);

    var msg_payload={ "isStopped": timenow};
    mq_client.make_request('checkbid_queue',msg_payload, function(err,results) {
        if(err){
            console.log("Error occurred");
        }else{
            console.log("Checking ongoing bid");
        }
    })
}, 5000);




exports.register1 = function(req, res){
		res.render('register1');
		};
	
	
	exports.signin = function(req, res){
		res.render('signin');
		};
	
	
	