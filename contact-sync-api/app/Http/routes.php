<?php

header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin: *');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

//SRoute::POST('/users', 'usercontroller@index');		

Route::POST('/user/login', 'usercontroller@login');

Route::POST('/user/addnew','usercontroller@store');

Route::GET('/users/{id}', 'usercontroller@show');

Route::GET('/users/contacts-add/{id}', 'usercontroller@contact');

Route::GET('/users/contacts-tag/{id}', 'usercontroller@tag');

Route::POST('/users/allcontacts-tag', 'usercontroller@alltags');

Route::POST('/users/suggcontacts-tag', 'usercontroller@suggtags');

Route::POST('/user/search', 'usercontroller@search');

/*contact edit*/
Route::GET('/users/edit-contact/{id}', 'usercontroller@edit');

/*Tag edit for ADMIN*/
Route::GET('/users/edit-tag/{id}', 'usercontroller@edittag');

/**update of contact in databse*/
Route::POST('/users/update-contact/{id}', 'usercontroller@update');

/*update of tag in database*/
Route::POST('users/updatetag/{id}','usercontroller@updatetag');

/*contact delete for admin*/
Route::POST('/users/delete-contact/{id}', 'usercontroller@destroy');

/*Tag Delete For ADMIN*/
Route::POST('/users/delete-tag/{id}', 'usercontroller@destroytag');


/**SEARCH ROUTES THROUGH TAG (for display of tag on onlick of tag)**/
Route::POST('/users/search-tag','usercontroller@findtag');

/**SEARCH ROUTES THROUGH Admin access to all TAG (for display of tag on onlick of tag)**/
Route::POST('/users/search-tag/{id}','usercontroller@allmanagetag');


/*Search by anything*/
 Route::POST('/users/keyword','usercontroller@findkeyword');

 /*Search by name*/
 Route::POST('/users/namekeyword','usercontroller@namekeyword');

 /*Search by email*/
 Route::POST('/users/emailkeyword','usercontroller@emailkeyword');

 /*Search by phone*/
 Route::POST('/users/phonekeyword','usercontroller@phonekeyword');

 /*Search by company*/
 Route::POST('/users/companykeyword','usercontroller@compkeyword');

 /*Search by tag*/
 Route::POST('/users/tagkeyword','usercontroller@tagkeyword');

 /*Search by city*/
 Route::POST('/users/citykeyword','usercontroller@citykeyword');

 Route::GET('/users/popular-tag/{id}','usercontroller@poptag');

 Route::POST('/users/newpass/{id}','usercontroller@newpass');








