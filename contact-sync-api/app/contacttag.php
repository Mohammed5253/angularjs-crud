<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class contacttag extends Model
{
    protected $table= 'contact_tag';

    public function contact()
    {
        return $this->belongsToMany('App\contact');
    }

    public function tag()
    {
        return $this->belongsToMany('App\Tag');
    }

    
}  
