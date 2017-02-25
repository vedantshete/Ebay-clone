var productdetail = angular.module('productdetailapp', []);
productdetail.controller('productdetail', function($scope,$http){

	$scope.productdetail=function(req, res){
		
		console.log("in profile angular");
		$http({
			method:'post',
			url:'/productdetail'
			
	}).success(function(data){
		console.log("getting product detail on product detail page");
		$scope.getproduct = data;
			$window.location.assign('/productdetail');
		})
	}
	
	$scope.addcart = function(){
		console.log($scope.product_id);
		alert("Product is successfully added to cart!");
		$http({
			method:'post',
			url:'/addcart',
			data:{
				"name":$scope.name,
				"productid":$scope.product_id,
				"price":$scope.price,
				"quantity":$scope.quantity,
				"quantityincart":$scope.quantityincart,
				"seller":$scope.seller
				}
			}).success(function(data){
			$window.location.assign('/homepage');
				
	}).error(function(error) {
			console.log("error");
		})
		
	}

	$scope.placebid = function(req,res){
		console.log($scope.product_id);
		$http({
			method:'post',
			url:'/placebid',
			data:{
				"product_id":$scope.product_id,
				"bid":$scope.newbid
			}
		}).success(function(data){
			alert("Press ok to place your bid");
			$window.location.assign('/homepage');

		}).error(function(error) {
			console.log("error");
		})

	}
	
	
});