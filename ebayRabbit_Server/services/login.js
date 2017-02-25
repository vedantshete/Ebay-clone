var bcrypt = require('bcrypt-nodejs');
var winston = require('winston');
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";


function check(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var user = db.collection('user');

        user.findOne({email: msg.email}, function (err, user) {
            if (user != undefined) {
                console.log("inside findone");
                if (bcrypt.compareSync(msg.password, user.password)) {
                   // res.render('profile');
                    res.code="200";
                    callback(null, res);
                }
            }
            else {
                res.code = "403";
                callback(null, res);
            }
        });
})
}
exports.check = check;


function reg(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);
    console.log(msg.password);
    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var user = db.collection('user');

        user.insert({
            "fname": msg.firstname,
            "lname": msg.lastname,
            "email": msg.email,
            "password": msg.password,
            "lastlogin":null
        }, function (err, user) {
            if (user) {
                console.log("User registered");
                callback(null, res);

            } else {
                console.log("Error in registering user");
                callback(null, res);
            }

        })
    })
}
exports.reg = reg;

function reg1(msg, callback){
    var res = {};
    console.log("Session has started for:"+ msg.email);
    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var user = db.collection('user');

        user.update(
            {"email": msg.email},
            {
                $set: {
                    "birthday": msg.birthday,
                    "handle": msg.handle,
                    "mobile": msg.mobile,
                    "place": msg.place
                }
            },
            {upsert: false},
            function (err, user) {
                if (user) {
                    console.log("User registration completed");
                    callback(null, res);
                } else {
                    console.log("returned false");
                    console.log("Error in registering user");
                    callback(null, res);
                }

            }
        )
    })
}
exports.reg1 = reg1;


function checkbid(msg, callback){
    var res = {};


    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');

        product.find({"isStopped":{$lte: msg.isStopped}, "forBid":1 }).toArray(function(err, result){
            console.log(result);
            if(result.length>0) {
                console.log("Bidding ended for: " + result);
                var id = new ObjectId(result[0]._id);
                console.log(id);
                product.update({"_id": id},
                    {
                        $set: {
                            "quantity": 0,
                            "forBid": 0
                        }
                    },{upsert: true});
                callback(null, res);
            }else{
                console.log("No bidding going on");
                callback(null, res);
            }

        })
    })
}
exports.checkbid = checkbid;

