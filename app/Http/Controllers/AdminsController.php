<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Dirape\Token\Token;
use Exception;
use App\User;
use App\Post;
use App\Tag;
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
    /**
     * Return a list of all users for admin
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function UserIndex(Request $request)
    {
        try{
            if(request("token")){
                if(Admin::where("api_token", request("token"))->first()){
                    return response()->json(User::all(), 200);
                }else{
                    throw new Exception("Authentication failed");
                }
            }else{
                throw new Exception("the token field is required");
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Return the information of a user
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function User(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
               'token' => "required",
               'id' => "required|integer",
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }
            if(Admin::where("api_token", request("token"))->first()){
                $theUser = User::where("id", request("id"))->first();
                if($theUser){
                    return response()->json($theUser, 200);
                }else{
                    throw new Exception("User not found");
                }
            }else
                throw new Exception("Authentication failed");
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Update a user's info
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function UserUpdate(Request $request)
    {
        try{
            $validator = Validator::make($request->all(),[
                'id' => 'required|integer',
                'name' => 'required|string|max:50',
                'email' => 'required|email',
                'password' => 'max:50',
                'token' => 'required'
                ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $user = User::where("id", request("id"))->first();
                if($user&& Admin::where("api_token", request("token"))->first()){
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
                    throw new Exception("User not found or Authentication failed");
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Create a new tag
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function CreateTag(Request $request)
    {
        try{
            $validator = Validator::make($request->all(),[
                'tag' => 'required|string|max:50',
                'description' => 'required|string|max:400',
                'token' => 'required'
                ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                if(Admin::where("api_token", request("token"))->first()){
                    $tag = new Tag;
                    $tag->tag = request("tag");
                    $tag->description = request("description");
                    $tag->save();
                    $message["error"] = null;
                    return Response()->json($message, 200);
                }else
                    throw new Exception("Authentication failed");
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }

    /**
     * Delete a tag
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function DeleteTag(Request $request)
    {
        try{
            $validator = Validator::make($request->all(),[
                'id' => 'required|integer',
                'token' => 'required'
                ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                if(Admin::where("api_token", request("token"))->first()){
                    $theTag = Tag::where("id", request("id"))->first();
                    if($theTag){
                        $theTag->delete();
                        $message["error"] = null;
                        return Response()->json($message, 200);
                    }else{
                        throw new Exception("Tag not found");
                    }
                }else
                    throw new Exception("Authentication failed");
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Return all admin users
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function Index(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'token' => 'required',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                if(Admin::where("api_token", request("token"))->first()){
                    return response()->json(Admin::select("id", "name", "email")->get(), 200);
                }else
                    throw new Exception("Authentication failed");
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Return info for a certain admin user
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function GetAdmin(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'token' => 'required',
                'id' => 'required|integer',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                if(Admin::where("api_token", request("token"))->first()){
                    $theAdmin = Admin::select("id", "name", "email")->where("id", request("id"))->first();
                    if($theAdmin)
                        return response()->json($theAdmin, 200);
                    else
                        throw new Exception("Admin not found");
                }else
                    throw new Exception("Authentication failed");
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
        /**
     * Return info for a certain admin user
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function AdminUpdate(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
                'name' => 'required|string|max:50',
                'email' => 'required|email',
                'password' => 'max:50',
                'token' => 'required'
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $admin = Admin::where("id", request("id"))->first();
                if($admin&& Admin::where("api_token", request("token"))->first()){
                    $emailAdmin = Admin::where("email", 'like', request("email"))->first();
                    if($emailAdmin&&$emailAdmin->id!=$admin->id){
                        throw new Exception("The Email has been taken");
                    }
                    if(!request("password")){
                        $admin->name = request("name");
                        $admin->email = request("email");
                        $admin->save();
                    }else{
                        $admin->password = sha1(request("password"));
                        $admin->name = request("name");
                        $admin->email = request("email");
                        $admin->save();
                    }
                    $message["error"] = null;
                    return response()->json($message, 200);
                }else{
                    throw new Exception("Admin not found or Authentication failed");
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
    /**
     * Return info for a certain admin user
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function DelAdmin(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'token' => 'required',
                'id' => 'required|integer',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                if(Admin::where("api_token", request("token"))->first()){
                    $theAdmin = Admin::where("id", request("id"))->first();
                    if($theAdmin){
                        $theAdmin->delete();
                        return response()->json("Deleted", 200);
                    }
                    else
                        throw new Exception("Admin not found");
                }else
                    throw new Exception("Authentication failed");
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }
}
