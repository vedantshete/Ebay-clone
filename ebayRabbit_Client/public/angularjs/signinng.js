var signin = angular.module('signinapp', []);

signin.controller('signin', function($scope,$http,$window){
	$scope.invalid_login=true;
	$scope.already_not_reg=true;
	$scope.valid_handle=true;
	$scope.invalid_handle=true;
	$scope.unreg_email=true;
	
//sends info to server for authenticating signin	
	$scope.signin=function(req,res){
		
		console.log("Angular of signin");
		$http({
			method:'post',
			url:'/check',
			data:{
				"email":$scope.email,
				"password":$scope.password
			}
			
		}).success(function(data){
			
			if (data.code == 403){
				console.log("Status code:403");
				$scope.invalid_login=false;
				
			}else{
				console.log("Control got here!");
				console.log(data.code);
				//console.log(data);
				//$scope.result=data;
				$scope.invalid_login=true;
				$window.location.assign('/homepage');
				
			}
			
		}).error(function(error) {
			
			$scope.invalid_login = true;
		})
}

//sends user data for initial registration to the server
	$scope.register=function(req,res){
		console.log("In registration's angular");
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
			
			console.log("User registered angular");
			$window.location.assign('/register1');
		});
	}

//sends user's further info after initial registration
	$scope.register1=function(req,res){
		console.log("In registration1's angular");
		console.log($scope.birthday + $scope.handle + $scope.mobile + $scope.place);
		$http({
			method:'post',
			url:'/reg1',
			data:{
				"birthday":$scope.birthday,
				"handle":$scope.handle,
				"mobile":$scope.mobile,
				"place":$scope.place
			}
			
		}).success(function(data){
			
			console.log("User profile updated angular");
			$window.location.assign('/signin');
		});
	}
	
//sends email used for signin to server to check error if email is not registered and user tries to sign-in	
// 	$scope.emailnotreg = function(req,res){
//
// 		console.log("Checking if email is registered: Angular");
// 		$http({
// 			method:'post',
// 			url:'/emailnotreg',
// 			data:{
// 				"email":$scope.email
// 			}
// 		}).success(function(data){
// 			if(data.statusCode===405){
// 				console.log("Email not registered");
// 				$scope.unreg_email=false;
// 			}else{
// 				console.log("Email registered already");
// 				$scope.unreg_email = true;
// 			}
//
// 		}).error(function(error) {
//
// 			$scope.unreg_email = true;
// 		})
//
// 	}
	
//sends data to server check if the email already exists in the system	
// 	$scope.emailreg = function(req,res){
//         $scope.already_not_reg=true;
// 		console.log("Checking if email is registered: Angular");
// 		console.log($scope.email);
// 		$http({
// 			method:'post',
// 			url:'/emailreg',
// 			data:{
// 				"email":$scope.email
// 			}
// 		}).success(function(data){
// 			console.log(data);
// 			if(data.statusCode===405){
// 				console.log("Email already registered");
// 				$scope.already_not_reg=false;
// 			}else{
// 				console.log("Registration continued");
// 				$scope.already_not_reg=true;
// 			}
//
// 		}).error(function(error) {
//
// 			$scope.already_not_reg = true;
// 		})
//
// 	}
	
	$scope.check_handle = function(req,res){
		
		console.log("Checking if handle is registered: Angular");
		$http({
			method:'post',
			url:'/check_handle',
			data:{
				"handle":$scope.handle
			}
		}).success(function(data){
			if(data.statusCode===403){
				console.log("handle already registered");
				$scope.valid_handle=true;
				$scope.invalid_handle=false;
			}else{
				console.log("Registration continued");
				$scope.valid_handle=false;
				$scope.invalid_handle=true;
			}
			
		}).error(function(error) {
			$scope.valid_handle=true;
			$scope.invalid_handle=true;
		})
	
	}
	
	
});