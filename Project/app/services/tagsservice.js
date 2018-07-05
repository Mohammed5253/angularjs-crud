app.service('tagserv', function($http,$location,$q){

	var id=localStorage.getItem('id');

	this.toptentags = function()
	{
        
		var deferred = $q.defer();
		
		$http.get(apiurl+"/users/contacts-tag/"+id)
    	.then(function(response) {

    		if(response.data !== "notag")
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
				deferred.resolve(response);

			}
			else
			{
				deferred.reject(response);

			}
    	
    	});
    	return deferred.promise;
	}

	this.tagsclick = function(data)
	{  

		var deferred = $q.defer();
		 $http.post(apiurl+"/users/search-tag/",data)
    	.then(function(response) {
    		if(response.data !== "No Tag Available")
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
    			deferred.reject(response);
    		}
     	});
     	return deferred.promise;
	}

	this.managetag = function()
    {
    	var deferred = $q.defer();
    	$http.post(apiurl+"/users/allcontacts-tag/")
	    .then(function(response) 
	    {
	    	if(response.data !== "")
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
				deferred.resolve(response);

			}
			else
			{
				deferred.reject(response);

			}
	    })
	    return deferred.promise;
    }
    
    this.delmanagetag = function(tid)
    {
    	var deferred = $q.defer();
   		$http.post(apiurl+"/users/delete-tag/"+tid)
		.then(function(response) 
		{
			deferred.resolve(response);
		});
			    return deferred.promise;
    }

    this.editmanagetag = function(tagid)
    {
    	var deferred = $q.defer();
    	$http.get(apiurl+"/users/edit-tag/"+tagid)
    	.then(function(response)
    	{
    		deferred.resolve(response);
    	});
    	return deferred.promise;
    }

    this.updatemanagetag = function(tagid,tagname)
    {	
        var deferred = $q.defer();
    	 $http.post(apiurl+"/users/updatetag/"+tagid,tagname)
	     .then(function(response)
    	{
    		deferred.resolve(response);
    	});
	     return deferred.promise;
    }

    this.tapcontact = function(tapid)
    {
        var deferred = $q.defer();
        $http.post(apiurl+"/users/search-tag/"+tapid)
        .then(function(response)
        {
            if(response.data !== "No Tag Available")
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

                deferred.resolve(response);
            }
            else
            {
                deferred.reject(response);
            }
        });

        return deferred.promise;
    }

});