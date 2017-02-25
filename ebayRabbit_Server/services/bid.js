/**
 * Created by vedantshete on 11/2/16.
 */
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function placebid(msg, callback){
    var res = {};
    console.log(msg.productid);
    var id = new ObjectId(msg.productid);
    console.log(id);

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');

        product.update({"_id":id},
            {
                $set:
                {
                    "price":msg.price,
                    "buyer_email":msg.buyer_email
                }
            },{ upsert: true },
            function(err, result){
                if(result){
                    console.log("Your bid has been placed");
                    callback(null, res);
                }else{
                    console.log("Error occurred while placing bid");
                    callback(null, res);
                }
            }
        )
    })
}
exports.placebid = placebid;