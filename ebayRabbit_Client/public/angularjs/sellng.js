var sell = angular.module('sellapp', []);
sell.controller('sell', function($scope,$http,$window){
	
	$scope.sell = function(req,res){
		console.log("Inside sell angular");
		$http({
			method:'post',
			url:'/sellitem',
			data:{
				"name":$scope.name,
				"description":$scope.description,
				"price":$scope.price,
				"quantity":$scope.quantity,
				"shippedfrom":$scope.shippedfrom
				}
			}).success(function(data){
				//console.log(data);
				alert("Press ok to post your add!");
				$window.location.assign('/homepage');
	}).error(function(error) {
			console.log("error");
		})
		
	}
	
	$scope.postbid = function(req,res){
		console.log("Inside postbid angular");
		$http({
			method:'post',
			url:'/postbid',
			data:{
				"name":$scope.name,
				"description":$scope.description,
				"price":$scope.price,
				"quantity":$scope.quantity,
				"shippedfrom":$scope.shippedfrom
				}
			}).success(function(data){
				//console.log(data);
				alert("Press ok to post your add!");
				$window.location.assign('/homepage');
	}).error(function(error) {
			console.log("error");
		})
		
	}
	
	
});