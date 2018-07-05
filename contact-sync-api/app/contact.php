<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class contact extends Model
{
	
	 
	 protected $table= 'contacts';

	 
	 /**
     * The users that owns  the contact.
     */

	
	public function user()
 	{
	 	return $this->belongsTo('App\user');
	 }

	
	protected $fillable=array('firstname','lastname','email','phone','address1','address2','pin','city','country',' company','source','tag','user_id','uploaded_at','created_at');

	
	/**
     * The tags that belong to the contact.
     */
   
    public function tag()
    {
        return $this->belongsToMany('App\Tag');
    }

      public function contact_tag()
    {
        return $this->belongsToMany('App\contacttag','tag_id');
    }

}
