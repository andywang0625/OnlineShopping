<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Dirape\Token\Token;
use Exception;
use App\User;
use App\Post;
use Illuminate\Support\Facades\Validator;

class AdminsController extends Controller
{
    /**
     * Register a new admin user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:50|unique:admins',
                'email' => 'required|email|unique:admins',
                'password' => 'required',
            ]);
            if($validator->fails())
                throw new Exception($validator->messages()->first());
            else{
                $request["password"] = sha1(request("password"));
                Admin::create($request->all());
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Login a existing admin user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:50',
                'password' => 'required|string|max:50',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->frist());
            }
            $admin = Admin::where("name", request("name"))->first();
            if(!$admin){
                $admin = Admin::where("email", request("name"))->first();
            }
            if(!$admin){
                throw new Exception("Admin user not found");
            }else{
                if($admin->password==sha1(request('password'))){
                    $token = (new Token())->Unique('admins', 'api_token', 60);
                    $admin->api_token = $token;
                    $admin->save();
                    $message["error"] = null;
                    $message["token"] = $token;
                    return response()->json($message, 200);
                }else{
                    throw new Exception("Password is wrong");
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Verify if an admin token is valid or not
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function isLogin(Request $request)
    {
        if(request("token")){
            $admin = Admin::where("api_token", request("token"))->first();
            if($admin){
                $message["error"] = null;
                $message["name"] = $admin->name;
                $message["email"] = $admin->email;
                return response()->json($message, 200);
            }else{
                $message["error"] = "Admin user not found";
                return response()->json($message, 406);
            }
        }else{
            $message["error"] = "Token field is required";
            return response()->json($message, 406);
        }
    }
    /**
     * Editing post api for admins
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function EditPost(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
                'title' => 'required|string|max:30',
                'number' => 'required|integer|min:1|max:1000',
                'price' => 'required|numeric|min:0|max:100000',
                'token' => 'required',
                'description' => 'required|string',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }
            if(Admin::where("api_token", request("token"))->first()){
                $thePost = Post::where("id", request("id"))->first();
                if($thePost){
                    $thePost->update([
                        'title' => request("title"),
                        'number' => request("number"),
                        'price' => request("price"),
                        'description' => request("description"),
                    ]);
                    $thePost->save();
                    $message["error"] = null;
                    return response()->json($message, 200);
                }else
                    throw new Exception("Post not found");
            }else
                throw new Exception("Authentication failed");
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
}
