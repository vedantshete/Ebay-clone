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

exports.getcart = function(req, res){
    var msg_payload = {"buyer_email":req.session.email};
    mq_client.make_request('getcart_queue', msg_payload, function (err, products) {
        if(err){
            console.log("Error occurred");
        }
        else
        {
            logger.log('info', "User with email: "+req.session.email+" checking his cart");
            console.log("Here's your cart");
            res.send(products);
        }
    })
};

exports.removeitem = function(req, res){
    var id = req.param("product_id");
	console.log(id);

    var msg_payload = {"productid":id, "buyer_email":req.session.email};
    mq_client.make_request('removeitem_queue', msg_payload, function (err, products) {
        if(err){
            throw err;
        }
        else
        {
            logger.log('info', "User with email: "+req.session.email+" removing item from his cart");
            console.log("Removing item from cart ");
            res.render('cart');
        }
    })
};

exports.checkout = function(req, res) {
    var getcartitems = req.param("getcartitems");


        for (i = 0; i < getcartitems.length; i++) {
            var id = getcartitems[i]._id;
            console.log(getcartitems[i].quantityincart+"  " + getcartitems[i]._id +"  "+ id);
            var msg_payload = {"productid":getcartitems[i]._id, "buyer_email":req.session.email, "quantityincart":getcartitems[i].quantityincart};
            mq_client.make_request('checkout_queue', msg_payload, function (err, products) {
                if(err){
                    throw err;
                }
                else
                {
                    logger.log('info', "User with email: "+req.session.email+" proceeding for checkout");
                    console.log("Checking out");
                    res.render('payment');
                }
            })

        }
};

exports.payment=function(req,res){
	res.render("payment");
}


exports.cart=function(req,res){
	//logger.log('info', "User with userid: "+req.session.userid+" checking their cart");
	res.render("cart");
}