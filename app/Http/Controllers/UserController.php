<?php

namespace App\Http\Controllers;

use App\User;
use Exception;
use Throwable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try{
            $validator = Validator::make($request->all(),[
                'user_name' => 'required|string|max:50|unique:users',
                'user_email' => 'required|email|unique:users',
                'user_password' => 'required',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                User::create($request->all());
                //error_log(json_encode($request->all()));
                return response(201);
            }
        }catch(Exception $e){
            return response($e->getMessage(),406);
        }
    }
}
