app.service('contact', function($http,$location,$q){

	var id=localStorage.getItem('id');

	$(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() < 10) {
            $('.bottom').fadeIn();
        } else {
            $('.bottom').fadeOut();
        }
    });

	
	$('.bottom').click(function() {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 1500);
        return false;
    });







	this.allcontacts = function($scope)
	{
		var deferred = $q.defer();
		$http.get(apiurl+"/users/contacts-add/"+id)
    	.then(function(response) {
	    	

	    	if(response.data != "No contact Available")
	    	{	
	    		
	    		$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});

	    		deferred.resolve(response)

	    	}
	    	else
	    	{
	    		deferred.reject(response.data)

	    	}
    	});
    	return deferred.promise;
	}


	this.deletecontact = function(c_id)
	{	
		var deferred = $q.defer();
		$http.post(apiurl+"/users/delete-contact/"+c_id,id)
		.then(function(response){
			deferred.resolve(response);
		});
		return deferred.promise;
	}

	this.tagsuggestions = function(tagdata)
	{
		var deferred = $q.defer();
		$http.post(apiurl+"/users/suggcontacts-tag/",tagdata)
    	.then(function(response) {
    		$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
		deferred.resolve(response)
		});
		return deferred.promise;
    }


	this.search = function(text)
	{	
		var deferred = $q.defer();
		$http.post(apiurl+"/users/keyword/",text)
		.then(function(response) {
			$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
		deferred.resolve(response)
		});
		return deferred.promise;
    }

    this.namesearch = function(name)
	{	
		console.log(name)
		var deferred = $q.defer();
		$http.post(apiurl+"/users/namekeyword/",name)
		.then(function(response) {
			$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
		deferred.resolve(response)
		console.log(response);
		});
		return deferred.promise;
    }

    this.emailsearch = function(email)
	{
		var deferred = $q.defer();
		$http.post(apiurl+"/users/emailkeyword/",email)
		.then(function(response) {
			$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
			deferred.resolve(response)
		});
		return deferred.promise;
    }

    this.phonesearch = function(phone)
	{
		var deferred = $q.defer();
		$http.post(apiurl+"/users/phonekeyword/",phone)
		.then(function(response) {
			$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
			deferred.resolve(response)
		});
		return deferred.promise;
    }

    this.citysearch = function(city)
	{
		var deferred = $q.defer();
		$http.post(apiurl+"/users/citykeyword/",city)
		.then(function(response) {
			$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
			deferred.resolve(response)
		});
		return deferred.promise;
    }

    this.companysearch = function(company)
	{
		var deferred = $q.defer();
		$http.post(apiurl+"/users/companykeyword/",company)
		.then(function(response) {
			$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
			deferred.resolve(response)
		});
		return deferred.promise;
    }

    this.tagsearch = function(tag)
	{
		var deferred = $q.defer();
		$http.post(apiurl+"/users/tagkeyword/",tag)
		.then(function(response) {
			$.each(response.data, function(i, item) {
     				if(response.data[i].lastname==null)
		        	{
	          	  		response.data[i].lastname="";		
		     		}
		     		else if(response.data[i].firstname==null)
		     		{
		     			response.data[i].firstname="";
		     		}
		     	});
			deferred.resolve(response)
			console.log(response.data[i].lastname)
		});
		return deferred.promise;
    }

    this.addnewcontact = function(form)
    {
    	var deferred = $q.defer();
		 $http.post(apiurl+"/user/addnew",form)
		    .then(function(response) {
			deferred.resolve(response)
		});
		return deferred.promise;
    }

    this.detail = function(detials)
    {
    	var deferred = $q.defer();
   		$http.get(apiurl+"/users/edit-contact/"+detials)
   		.then(function(response){

   	
   			$.each(response.data, function(i, item) {
     				
     				if(response.data.lastname==null)
		        	{
	          	  		response.data.lastname="";		
		     		}
		     		else if(response.data.firstname==null)
		     		{
		     			response.data.firstname="";
		     		}
		    });

   			deferred.resolve(response)
	   	});
   		return deferred.promise;
    }

    this.update = function(conid,getupdate)
    {
    	var deferred = $q.defer();
    	console.log(getupdate)
   		$http.post(apiurl+"/users/update-contact/"+conid,getupdate)
   		.then(function(response){
   			deferred.resolve(response)
   		});
   		return deferred.promise;
    }

    // TAG SERVICES

        
});