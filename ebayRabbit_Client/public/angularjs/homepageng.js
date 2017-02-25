var homepage = angular.module('homepageapp',[]);
homepage.controller('homepage', function($scope, $http){

		$scope.homepage=function(req,res){
			console.log("Retrieving products");
			$http({
				method:'post',
				url:'/getproduct'
			}).success(function(data){
				$scope.getproduct = data;
				
			})
			
		}


	$scope.myAds=function(req,res){
		console.log("In myAds angular");
		$http({
			method:'post',
			url:'/getMyAds'
		}).success(function(data){
			console.log(data);
			$scope.getMyAds = data;
		})
	}
});