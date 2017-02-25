var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function logout(msg, callback){
    var res = {};
    console.log("In handle request:"+ msg.email);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var user = db.collection('user');

        user.update(
            {"email": msg.email},
            {$set:
            {
                "lastlogin":msg.lastlogin
            }},
            { upsert: false },
            function (err, user) {
                if (user) {
                    console.log("User logged out");
                    callback(null, res);

                } else {
                    console.log("Error in log out");
                    callback(null, res);
                }

            }
        )
    })
};
exports.logout = logout;