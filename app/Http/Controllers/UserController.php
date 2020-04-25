<?php

namespace App\Http\Controllers;

use App\User;
use Exception;
use Throwable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Dirape\Token\Token;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try{
            $validator = Validator::make($request->all(),[
                'name' => 'required|string|max:50|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $request["password"] = sha1(request("password"));
                User::create($request->all());
                //error_log(json_encode($request->all()));
                return response(201);
            }
        }catch(Exception $e){
            return response($e->getMessage(),406);
        }
    }

    public function login(Request $request)
    {
        //error_log(md5(rand(1,10).microtime()));
        $user = User::where('name', request('name'))->first();
        if(!$user){
            $user = User::where('email', request('name'))->first();
        }
        if(!$user){
            return response()->json(['error'=>'User not found'], 401);
        }else{
            if($user["password"]==sha1(request('password'))){
                $token = (new Token())->Unique('users','api_token',60);
                $user["api_token"] = $token;
                $user->save();
                $message["error"] = null;
                $message["token"] = $token;
                return response()->json($message, 200);
            }else{
                return response()->json(['error'=>"Password is invalid"],401);
            }
        }
    }

    public static function logedin($token)
    {
        $user = User::where('api_token', request("token"))->first();
        if($user){
            return true;
        }else{
            return false;
        }
    }

    public function logout(Request $request)
    {
        $user = User::where('api_token', request("token"))->first();
        if($user){
            $user['api_token'] = (new Token())->Unique('users','api_token', 60);
            return response()->json(["message"=>"Logged out"], 200);
        }else{
            return response()->json(["message"=>"You have not logged in"], 401);
        }
    }

    public function isLogin(Request $request){
        if(!request("token")){
            $message["status"] = false;
            return response()->json($message, 200);
        }
        $user = User::where('api_token', request("token"))->first();
        if($user){
            $message["status"] = true;
            $message["name"] = $user["name"];
            $message["email"] = $user["email"];
            $message["id"] = $user["id"];
            return response()->json($message,200);
        }else{
            $message["status"] = false;
            return response()->json($message, 200);
        }
    }

    public function EditUser(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                'name' => 'required|string|max:50',
                'email' => 'required|email',
                'password' => 'max:50',
                'token' => 'required'
                ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $user = User::where("api_token", request("token"))->first();
                if($user){
                    $emailUser = User::where("email", 'like', request("email"))->first();
                    if($emailUser&&$emailUser->id!=$user->id){
                        throw new Exception("The Email has been taken");
                    }
                    if(!request("password")){
                        $user->name = request("name");
                        $user->email = request("email");
                        $user->save();
                    }else{
                        $user->password = sha1(request("password"));
                        $user->name = request("name");
                        $user->email = request("email");
                        $user->save();
                    }
                    $message["error"] = null;
                    return response()->json($message, 200);
                }else{
                    throw new Exception("User not found");
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }

}
