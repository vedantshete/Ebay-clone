var thisapp = angular.module('thisapp', []);
thisapp.controller('this', function($scope,$http){
	
	$scope.bought=function(req,res){
		console.log("In bought angular");
		$http({
			method:'post',
			url:'/getbought'
		}).success(function(data){
			console.log(data);
			$scope.getbought = data;
		})
	};
	
	$scope.sold=function(req,res){
		console.log("In sold angular");
		$http({
			method:'post',
			url:'/getsold'
		}).success(function(data){
			console.log(data);
			$scope.getsold = data;
		})
	};
	
	
	
})