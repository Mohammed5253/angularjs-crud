var app = angular.module('contactTable1', []);

app.controller('contactTable',function(doLogin,contact,$timeout,$window,tagserv,$scope, $http,$location){

	if($window.localStorage.length == 0)
 	{
 		if($location.path() == '/listview'){
 			$timeout(function () {
 					$location.path('/')
	 		    }, 200)
 		}
 		
 	}

	 var id=localStorage.getItem('id');

 	/// Jquery for catergory  search options
	$(document).ready(function(e){
	    $('.search-panel .dropdown-menu').find('a').click(function(e) {
	    	e.preventDefault();
			var param = $(this).attr("href").replace("#","");
			var concept = $(this).text();
			$('.search-panel span#search_concept').text(concept);
			$('.input-group #search_param').val(param);
		});
	});


	$scope.logout = function()
	{		
			$window.location.reload();
			$().ready(function() {
    	    	history.pushState(null, null, 'login');
        		window.addEventListener('popstate', function () {
            	history.pushState(null,null);
	        });
		});
	}

	
	doLogin.userinfo(id);
    
    doLogin.userinfo().then(function(response){
    	$scope.users=response.data;
	});



	//Code for display list of all avail contact on onclick of ALL through Contact Service*/
	$scope.allcontacttag = function()
	{
   	   $scope.promise = contact.allcontacts(id);
		
		$scope.promise.then(
		 	function(response){
	  		 	$scope.mycard = response.data;},
		 	
		 	function(err){
		 		$scope.Message="err";
		 	});
	};
	

	//Code for display list of all avail contact through servicw/
	contact.allcontacts(id);
  
    contact.allcontacts().then(
    	function(response){
   			
   			$location.path('/listview');
            
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

   			$location.path('/listview');
   			$scope.Message=err;
   		}
   	);;     	  	

   	//Code for display top ten tag through Contact Service*/				

	tagserv.toptentags(id);
   
    tagserv.toptentags().then(
    	function(response){

	    $location.path('/listview');
	    $scope.mytag=response.data
        },function(err){
        	$scope.Message=err;

        });	



	//Code for SEARCH through list of all avail contact on onchange through service

	//onchange function
	$scope.mysearch=function(){
		$scope.data=$scope.add.consearch;
		var data =
		{
			'uid' : id,
			 'x':tags.id
		}
			contact.search(data);
			contact.search(data).then(function(response){
			$rootScope.loading = false;
			$scope.mycard=response.data;
		 });
	}

	//code for display of contact on onclikc of tag
		
	/*Code for display of contact card on onclick(srtag())of Tag*/
	$scope.srtag=function(tags)
	{
		var data =
		{
			'uid' : id,
			 'x':tags.id
		};
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
		
		var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
			contact.search(data);
			contact.search(data).then(function(response){
			
			$scope.mycard=response.data;
		 });
	};

	//Search by Anyhting 
	$scope.any=function(){
		$scope.mysearch=function(){
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
			    contact.search(data);
				contact.search(data).then(function(response){
					
					$scope.mycard=response.data
			 	});
		};
	};

	// Search by Name
	$scope.name=function(){
		$scope.mysearch=function(){
			var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
			contact.namesearch(data);
				contact.namesearch(data).then(function(response){
					
					$scope.mycard=response.data;
				});
		};
	}

	// Search by email
	$scope.email=function(){
		$scope.mysearch=function(){
			
		var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
				contact.emailsearch(data);
				contact.emailsearch(data).then(function(response){
					
					$scope.mycard=response.data;
				});
		};
	}

	// Search by Phone
	$scope.phone=function(){
		$scope.mysearch=function(){
		var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
			contact.phonesearch(data);
			contact.phonesearch(data).then(function(response){
				
				$scope.mycard=response.data;
			 });
		};
	}

	// Search by City
	$scope.city=function(){
		$scope.mysearch=function(){
			
var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')
			}
			contact.citysearch(data);
			contact.citysearch(data).then(function(response){
				
				$scope.mycard=response.data;
			 });
		};
	}

	// Search by Tag
	$scope.tag=function(){
		$scope.mysearch=function(){
			
		var data = {
				'text' : $scope.add.consearch,
				'uid'  : localStorage.getItem('id')				
			}
			contact.tagsearch(data);
			contact.tagsearch(data).then
			(function(response) {
				$scope.mycard={};
				$scope.mycard=response.data
			 });
		};
	}

	// Search by Company
	$scope.company=function(){
		$scope.mysearch=function(){
			
			var data =
		{
			'uid' : id,
			 'x':tags.id
		}
			contact.companysearch(data);
			contact.companysearch(data).then(function(response)
			{
			    
				$scope.mycard=response.data;
			 });
		};
	}
});
