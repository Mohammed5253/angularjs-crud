app.service('doLogin', function($http,$location,$q){
    this.login = function (email,pass,$scope) {
		
	    var deferred = $q.defer();
		 check = {email:email, password:pass};
 	     $http.post(apiurl+"/user/login",check)
    	.then(function(response) 
    	{
	         if(response.data !=="wrong Credentials")
	 	        {			
	 	      	$location.path('/contacts')
	 	         localStorage.setItem('myWelcome', JSON.stringify(response.data));
	 			 localStorage.setItem ('id',response.data[0].id);
	 			 localStorage.setItem ('is_admin',response.data[0].is_admin);
	 			 var uid=response.data[0].id;
         	     var retrievedData = localStorage.getItem("myWelcome");
     	         var myWelcome2=JSON.parse(retrievedData);
    	      	   	
    	      	 deferred.resolve(response);	

	 	        }	
	         else
	 	        {	
	 	       	 	deferred.reject(response)
    	        }
		},function(response)
		{
			deferred.reject(response)	
		}


		);
  				return deferred.promise;
	};

	this.changepassword = function(id, details)
	{
		var deferred = $q.defer();
		$http.post(apiurl+"/users/newpass/"+id,details)
		.then(function(response)
		{
			if(response.data !=='Wrong Credentials')
			{
				deferred.resolve(response)
			}
			else
			{
				deferred.reject(response);
			}
		});
		return deferred.promise;
	}

	this.userinfo = function(){
		
		var id=localStorage.getItem('id');
		var deferred = $q.defer();
		$http.get(apiurl+"/users/"+id)
    	.then(function(response) {
    	
		deferred.resolve(response)
    	
    });

    return deferred.promise;
	}
});
