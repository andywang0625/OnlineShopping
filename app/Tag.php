<?php
/*
 * @Author: Kanade
 * @Date: 2020-05-01 15:40:21
 * @LastEditTime: 2020-05-01 15:44:02
 * @Description:
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function posts()
    {
        return $this->belongsToMany('App\Post', 'post_tags');
    }
}
