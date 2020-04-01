<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Post extends Model
{
    protected $primaryKey = 'id';
    protected $guarded = ['id'];
    public function user(){
        return $this->belongsTo('App\User');
    }
    public function images(){
        return $this->hasMany('App\PostImages', 'postid', 'id');
    }
    public static function boot(){
        parent::boot();

        static::deleting(function($post){
            $post->images()->delete();
        });
    }
}
