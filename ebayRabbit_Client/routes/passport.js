/**

 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";
var mq_client = require('../rpc/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username, password, done) {

        var msg_payload={ "email": username, "password": password };
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

    }));
}


