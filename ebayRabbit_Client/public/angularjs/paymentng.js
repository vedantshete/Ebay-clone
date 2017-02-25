var endit = angular.module('enditapp', []);
endit.controller('endit', function($scope, $http, $window){
	
	$scope.endit=function(req,res){
		console.log("alla re call");
		$http({
			method:'post',
			url:'/ended',
			data:{
			}
			}).success(function(data){
					alert("Thankyou for shopping with us!");
					$window.location.assign('/homepage');
				})
				
			}
});
		



