<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Factory;
use Tymon\JWTAuth\Manager as JWT;

class UserController extends Controller{
    public function register(Request $request){
        $validator = Validator::make($request->json()->all() ,[
            'name'=>'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password'=>'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }
        $user = User::create([
            'name'=>$request->json()->get('name'),
            'email'=>$request->json()->get('email'),
            'password'=>Hash::make($request->json()->get('password')),

        ]);

        $token =
    }
}
