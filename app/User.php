<?php
/*
 * @Author: Kanade
 * @Date: 2020-03-06 06:07:00
 * @LastEditTime: 2020-04-27 02:23:50
 * @Description:
 */

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    protected $fillable = ["name","email","password"];
    public function posts(){
        return $this->hasMany('App\Post', "userid", "id");
    }

    public function messagesSent()
    {
        return $this->hasMany("App\Message", "senderid", "id");
    }
    public function messagesReceived()
    {
        return $this->hasMany("App\Message", "targetid", "id");
    }
}
