var profile = angular.module('profileapp', []);
profile.controller('profile', function($scope,$http){

	$scope.getprofile=function(req, res){
		console.log("in profile angular");
		$http({
			method:'post',
			url:'/profile'
			
	}).success(function(data){
		console.log("sending profile to profile page: angular");
			$scope.fname=data.fname;
			$scope.lname=data.lname;
			$scope.email=data.email;
			$scope.mobile=data.mobile;
			$scope.birthday=data.birthday;
			$scope.handle=data.handle;
			$scope.place=data.place;
		$scope.getprofile=data;
		console.log($scope.getprofile);
		//$window.location.assign('/profile');
		})
	}
	
});