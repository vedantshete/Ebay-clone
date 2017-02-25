var getcart = angular.module('getcartapp', []);
getcart.controller('getcart',function($scope,$http,$window){
	
	
$scope.getcart = function(req, res){
	$scope.grandtotal=2;
	$http({
		method:'post',
		url:'/getcart'
		}).success(function(data){
			console.log("getting products in angular");
			console.log(data);
			console.log(data.length);
		$scope.getcartitems = data;
			for(i=0; i<data.length; i++){
				$scope.grandtotal=$scope.grandtotal+data[i].total;
			}
			})
}

$scope.settotal = function(){
	var temp = 0;
	for(i=0; i<$scope.getcartitems.length; i++){
		temp=temp+($scope.getcartitems[i].quantityincart*$scope.getcartitems[i].price);
	}
	$scope.grandtotal=temp;
	console.log($scope.grandtotal);
}


$scope.removeitem = function(product_id, cart_id){
	$scope.product_id=product_id;
	$scope.cart_id=cart_id;
	console.log(product_id, cart_id);
	$http({
		method:'post',
		url:'/removeitem',
		data:{
				"product_id":$scope.product_id,

			}	
	}).success(function(data){
		$window.location.assign('/cart');
	})	
}


$scope.updatequantity = function(quantity,index){
    console.log(quantity);
	$scope.getcartitems[index].quantityincart = quantity;
	$scope.settotal();
}


$scope.checkout = function(req, res){
    console.log($scope.getcartitems[0]._id);
	$http({
		method:'post',
		url:'/checkout',
		data:{
				"getcartitems":$scope.getcartitems
			}	
	}).success(function(data){
		$window.location.assign('/payment');
	})	
	
	
}


});