var app = angular.module('managetag',[]);

app.controller('managetagcontroller', function(tagserv,$window,$timeout,$routeParams,$scope,$location,$http,$window,$rootScope,$localStorage,$sessionStorage) {


	if($window.localStorage.length == 0)
 	{
 		if($location.path() == '/manage_tags'){
 			$timeout(function () {
 					$location.path('/')
	 		    }, 200)
 		}
 		
 	}

	$scope.logout = function()
	{		
			$window.location.reload();
			$().ready(function() {
    	    	history.pushState(null, null, 'login');
        		window.addEventListener('popstate', function () {
            	history.pushState(null,null);
	        });
		});
			location.path('/')
	}

	// Getting all the available tags
	tagserv.managetag();
	tagserv.managetag().then(
		function(response)
		{	
			$scope.managetag = response.data;
    	  	$scope.filt = 'All';
			$scope.setFilter = function(letter) 
			{
				$scope.filt = letter;
			};
			  
			$scope.names = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			 
			$scope.startsWith = function(managetag)
			{
				var lowerStr = (managetag.name + "").toLowerCase();
			    var letter = $scope.filt;
			    if (letter === 'All') return true;
			    return lowerStr.indexOf(letter.toLowerCase()) === 0;
			}
		}
	)

	// FUntion to delete seletect tag
	$scope.delete=function(tags){
		t_id=tags.id;
		tagserv.delmanagetag(t_id);
		tagserv.delmanagetag(t_id)
		.then(function(response) {
			$window.alert("Your Tag is deleted");
			tagserv.managetag()
	    	.then(function(response) {
		        if(response.data=="")
			        {
			        	$scope.Message="No any tags";
			        }
		        else
			        {	
			        	 $scope.managetag = response.data;
				    };
			});	    	 
		});	
	};
	
	// Function to edit tag
	$scope.edit=function(tags){
	    $scope.edittag = true;
	    tagid=tags.id;
		tagserv.editmanagetag(tagid);
		tagserv.editmanagetag(tagid).then(
			function(response){
				$scope.mytag=response.data;
			});
		$scope.edittag = function(mytag) {
 		id=mytag.id;
 		var tagname = $scope.tag
 	    tagserv.updatemanagetag(id,tagname);
 	    tagserv.updatemanagetag(id,tagname)
 	    .then(function(response) {
		        $scope.edittag = false;
	            tagserv.managetag();
	            tagserv.managetag()
	    		.then(function(response) {
	    	    	 	$scope.managetag = response.data;
	     		});
		    }); 
	    };
	};

	// on click of tag show that contact card
	$scope.tagcontact=function(tags){
	tapid=tags.id;
	tagserv.tapcontact(tapid);
	tagserv.tapcontact(tapid)
		.then(
			function(response) 
			{
				$scope.mycard=response.data;
			$scope.Message2="";
			},function(response)
			{
				$scope.Message2="No such contact Available";
				$scope.mycard="";
			
			}
			
		);	
	};	 

});	
