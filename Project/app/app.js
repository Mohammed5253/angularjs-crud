var app = angular.module('myApp',['naif.base64','passApp','managetag','ngRoute','ngStorage','validationApp','profile','addnew','edit','contactTable1']);

app.config(function($routeProvider){
	$routeProvider
	  .when("/",{
        templateUrl :"app/views/login.html",
        controller:"loginController"

	})
	.when("/contacts",{
        templateUrl :"app/views/contacts.html",
        controller:"profileController"

	})
	.when("/add_new",{
		templateUrl:"app/views/add_new.html",
		controller:"addContactController"
	}) 	
	.when("/edit_contact/:id",{
		templateUrl:"app/views/edit_contact.html",
		controller:"editContactController"
	})
	.when("/manage_tags",{
		templateUrl:"app/views/manage_tags.html",
		controller:"managetagcontroller"
	})
	.when("/listview",{
		templateUrl:"app/views/listview.html",
		controller:"contactTable"
	})
	.when("/change_pass",{
		templateUrl:"app/views/changepass.html",
		controller:"changepassController"
	})
	
});	
