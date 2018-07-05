<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
  protected $table= 'tags';

 public function user()
	 {
 	return $this->belongsTo('App\user');
 }

 protected $fillable=array('name');

 /**
   * The contacts that belong to the tag.
   */
  public function contact()
  {
      return $this->belongsToMany('App\contact');
  }

  public function contact_tag()
  {
      return $this->belongsToMany('App\contacttag','tag_id');
  }
}
