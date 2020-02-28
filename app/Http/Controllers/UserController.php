<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request)
    {
        User::create($request->all());
        //error_log(json_encode($request->all()));
        return response(201);
    }
}
