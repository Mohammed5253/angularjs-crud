var app = angular.module('passApp',[]);




// create angular controller
validationApp.controller('changepassController', function(doLogin,$timeout,$window,$rootScope,$scope,$location,$http,$localStorage,$sessionStorage
) 
{	if($window.localStorage.length == 0)
 	{
 		if($location.path() == '/change_pass'){
 			$timeout(function () {
 					$location.path('/')
	 		    }, 200)
 		}
 		
 	}
 	$scope.changepass = function()
	{		
		
		var  passchange = {email:$scope.email,oldpass:$scope.oldpass,newpass:$scope.newpass};

		  doLogin.changepassword(id,passchange);
		  doLogin.changepassword(id,passchange)	
			.then(
				function(response){
					
					$scope.message=	"Your Password is Changed Successfully.You are Redirected to Homepage....";
   			    	
				$timeout(function () {
					$location.path('/contacts')
	 		    }, 3000)
	 		},function(err){
					
					$scope.message="Please Check you Email or Old Password";
					
			});
	}; 
});			