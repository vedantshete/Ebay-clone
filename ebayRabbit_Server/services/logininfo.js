/**
 * Created by vedantshete on 11/1/16.
 */
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function logininfo(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var user = db.collection('user');

            user.findOne({email: msg.email}, function (err, user) {
                if (user) {
                    console.log("Showing user's last login");
                    console.log(user);
                    callback(null, user);
                }
                else {
                    console.log("Error occured while showing user profile");
                    callback(null, res);
                }
            })
    })
};
exports.logininfo = logininfo;