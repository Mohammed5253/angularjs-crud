
var validationApp = angular.module('validationApp',['ngStorage']);




// create angular controller
validationApp.controller('loginController', function(doLogin,$timeout,$window,$rootScope,$scope,$location,$http,$localStorage,$sessionStorage
) 
{	
	 var id=localStorage.getItem('id');
	 // function to submit the form after all validation has occurred			
	 $scope.submitForm = function(email,pass) 
	 {	
		
		doLogin.login(email,pass);
		
		doLogin.login(email,pass).then(
			function(response)
			{
				$location.path('/contacts')
			},
			function(err)
       		{
        		
        		if(err.status == -1)
        		{
        			$scope.errorMessage = "Server Error.Please Try again after some time."
        			console.log(err.status)
        		}
        		else
        		{
        			$scope.errorMessage = 'Please Enter Correct Credentials';
        		}
        	}
    	);
	}

	// function to change Password

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





