/**
 * Created by vedantshete on 11/2/16.
 */
var moment = require('moment');
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

function payment(msg, callback){
    var res = {};

    mongo.connect(mongoURL, function (err,db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = db.collection('product');
        var cart = db.collection('cart');
        var user = db.collection('user');

        cart.find({buyer_email:msg.buyer_email}).toArray(function(err, results){

            if(err){
                console.log("In error");
                callback(null, res);
            }
            else {

                console.log("No of products in cart "+results.length);
                for(i=0;i<results.length;i++){
                    var id = new ObjectId(results[i]._id);
                    console.log(id);
                    console.log(results[i]._id);
                    product.update({_id: id},
                        {
                            $set: {
                                "buyer_email": msg.buyer_email
                                //"total": getcartitems[i].total
                            }
                        });
                    console.log(results[i].quantity - results[i].quantityincart);
                    product.update({_id: id},
                        {
                            $set: {
                                "quantity": results[i].quantity - results[i].quantityincart
                                //"total": getcartitems[i].total
                            }
                        });
                    cart.deleteMany({ buyer_email : msg.buyer_email });

                }
                callback(null, res);
            }
        });
    })
}
exports.payment = payment;