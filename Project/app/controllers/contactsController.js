	var app = angular.module('profile',[]);

	/*Controller starts Here*/
	app.controller('profileController', function(doLogin,tagserv,contact,$timeout,$routeParams,$scope,$location,$http,$window,$rootScope,$localStorage,$sessionStorage) {
 	var id=localStorage.getItem('id');


 	if($window.localStorage.length == 0)
 	{
 		if($location.path() == '/contacts'){
 			$timeout(function () {
 					$location.path('/')
	 		    }, 200)
 		}
 		
 	}
 	
 	// Jquery for catergory of search
	$(document).ready(function(e){
	    $('.search-panel .dropdown-menu').find('a').click(function(e) {
	    	e.preventDefault();
			var param = $(this).attr("href").replace("#","");
			var concept = $(this).text();
			$('.search-panel span#search_concept').text(concept);
			$('.input-group #search_param').val(param);
		});
	});
 
	

	//Funtion to disable back button after Logout
	$scope.logout = function()
	{		
			$window.location.reload();
			$window.localStorage.clear();
			$().ready(function() {
    	    	history.pushState(null, null, 'login');
        		window.addEventListener('popstate', function () {
            	history.pushState(null,null);
	        });        	    	
		});
	}

	// Function for display of all contacts on landing page without refresh.
	$scope.allcontacttag = function()
	{

		
		$scope.promise =contact.allcontacts(id);
		
		$scope.promise.then(
		 	function(response){
		 		$scope.mycard = response.data;
		 	},
		 	
		 	function(err){
		 		$scope.Message="err";
		 	});
	};
 

    doLogin.userinfo(id);
    
    doLogin.userinfo().then(function(response){
    	$scope.users=response.data;
	});


	/*Add contact and display that contact in user landing page*/
	
	contact.allcontacts(id);
  
    contact.allcontacts().then(
    	function(response){
   			localStorage.setItem('mycard', JSON.stringify(response.data));
	  		 	
   			$location.path('/contacts');
            
            $scope.mycard = response.data;
            
            var admin=localStorage.getItem('is_admin');
	 		 	 if(admin=='no')
	 		 	 {
	 		 	 	$scope.manage=false;
	 		 	 }
	 		 	 else
	 		 	 {
	 		 	 	$scope.manage=true;
	 		 	 }	

   		},function(err){

   			$location.path('/contacts');
   			$scope.Message=err;
   		}
   	);


	/*Get of name of 10tags from database*/
    tagserv.toptentags(id);
   
    tagserv.toptentags().then(
    	function(response){

	    $location.path('/contacts');
	    $scope.mytag=response.data
        },function(err){
        	$scope.Message=err;

    	}
    );	
    
    /*Delete contact*/	
	$scope.delete=function(deleteid)
	{
		if ($window.confirm("Do you want to delete this contact?"))
		{
			if($scope.result = "Yes")
			{
				$scope.contact_id = localStorage.getItem('id');
				c_id= deleteid.id;
				contact.deletecontact(c_id);
				contact.deletecontact(c_id).then(
					function(response) {
				 	$window.alert("Your contact is deleted");
						contact.allcontacts(id);
    					contact.allcontacts().then(function(response) {
					 	$scope.mycard = response.data;
					});
				});

			};
		}
		else if($scope.result = "No")
		{
			
			$location.path('/contacts');
		}
	};

	
	/*Code for display of contact card on onclick(srtag())of Tag.*/
	$scope.srtag=function(tags)
	{	
		
		var data =
		{
			'uid' : id,
			 'x':tags.id
		}
		tagserv.tagsclick(data);
	    tagserv.tagsclick(data).then(
	    	function(response)
			{
				$scope.mycard=response.data;
				$scope.Message2="";	
			},function(err)
			{
				$scope.Message2="No such contact Available";
				$scope.mycard="";
			}
		);
	};		

	/*Onchange of search textbox this funtion will call*/
	$scope.mysearch=function(){
		$rootScope.loading = true;
		var data = {
			'text' : $scope.add.consearch,
			'uid'  : localStorage.getItem('id')
		}
			contact.search(data);
			contact.search(data).then(function(response){
			$rootScope.loading = false;
			$scope.mycard=response.data;
		 });				
	};

	//Search by Anyhting 
	$scope.any=function(){
		
		$scope.mysearch=function(){
			
			$rootScope.loading = true;
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
			
			    contact.search(data);
				contact.search(data).then(function(response){
					$rootScope.loading = false;
					$scope.mycard=response.data
			 	});
		};
	};



	// Search by Name
	$scope.name=function(){
		$scope.mysearch=function(){
			$rootScope.loading = true;
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
			console.log(data);
				contact.namesearch(data);
				contact.namesearch(data).then(function(response){
					$rootScope.loading = false;
					$scope.mycard=response.data;
				});


		};
	}

	// Search by email
	$scope.email=function(){
		$scope.mysearch=function(){
			$rootScope.loading = true;
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')				
			}
				contact.emailsearch(data);
				contact.emailsearch(data).then(function(response){
					$rootScope.loading = false;
					$scope.mycard=response.data;
				});
		};
	}

	// Search by Phone
	$scope.phone=function(){
		$scope.mysearch=function(){
			$rootScope.loading = true;
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')				
			}
			contact.phonesearch(data);
			contact.phonesearch(data).then(function(response){
				$rootScope.loading = false;
				$scope.mycard=response.data;
			 });
		};
	}

	// Search by City
	$scope.city=function(){
		$scope.mysearch=function(){
			$rootScope.loading = true;

			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')				
			}
			contact.citysearch(data);
			contact.citysearch(data).then(function(response){
				$rootScope.loading = false;
				$scope.mycard=response.data;
			 });
		};
	}

	// Search by Tag
	$scope.tag=function(){
		$scope.mysearch=function(){
			$rootScope.loading = true;
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')				
			}
			contact.tagsearch(data);
			contact.tagsearch(data).then
			(function(response) {
			$rootScope.loading = false;
				$scope.mycard=response.data
			 });
		};
	}

	// Search by Company
	$scope.company=function(){
		$scope.mysearch=function(){
			$rootScope.loading = true;
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')				
			}
			contact.companysearch(data);
			contact.companysearch(data).then(function(response)
			{
			    $rootScope.loading = false;
				$scope.mycard=response.data;
			 });
		};
	}
});
/*Controller Ends Here*/

