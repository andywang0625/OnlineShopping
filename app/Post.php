<?php
/*
 * @Author: Kanade
 * @Date: 2020-03-20 05:21:57
 * @LastEditTime: 2020-05-03 14:52:45
 * @Description:
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Post extends Model
{
    public function __toString()
    {
        return $this->attributes["id"];
    }
    protected $primaryKey = 'id';
    protected $guarded = ['id'];
    public function user(){
        return $this->belongsTo('App\User', "userid", "id");
    }
    public function images(){
        return $this->hasMany('App\PostImages', 'postid', 'id');
    }
    public function tags()
    {
        return $this->belongsToMany('App\Tag', 'post_tags');
    }
    public static function boot(){
        parent::boot();

        static::deleting(function($post){
            $post->images()->delete();
        });
    }
}
