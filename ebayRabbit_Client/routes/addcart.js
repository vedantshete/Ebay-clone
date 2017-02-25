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

exports.addcart = function(req, res){
	
	var name=req.param("name");
    var productid = req.param("productid");
	var price=req.param("price");
	var quantity=req.param("quantity");
    var quantityincart=req.param("quantityincart");

    var msg_payload = {"name":name, "productid":productid, "price":price, "buyer_email":req.session.email, "quantity":quantity, "quantityincart":quantityincart, "total":quantityincart*price};
    mq_client.make_request('addcart_queue', msg_payload, function (err, products) {
        if(err){
            throw err;
        }
        else
        {
            console.log("Adding product to cart "+products);
            res.render('homepage', {product: products});
        }
    })
};