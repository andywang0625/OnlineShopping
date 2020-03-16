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
}
