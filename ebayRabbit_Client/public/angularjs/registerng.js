var reg = angular.module('signinapp', []);
reg.controller('register', function($scope, $http) {
	$scope.register=function(req,res){
		console.log("In registeration's angular");
		$http({
			method:'post',
			url:'/reg',
			data:{
				"email":$scope.email,
				"password":$scope.password,
				"firstname":$scope.firstname,
				"lastname":$scope.lastname
			}
			
		}).success(function(data){
		});
	}
});
