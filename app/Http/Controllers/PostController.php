<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\PostImages;
use App\Http\Controllers\UserController;
use App\Tag;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Database\QueryException;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        error_log(UserController::logedin(request("token")));
        $data = Post::all();
        return response()->json($data, 200);
    }

    public function delPost(Request $request)
    {
        if(request("token")){
            if(request("id")){
                $post = Post::where("id", request("id"))->first();
                if(!$post){
                    return Response()->json("No Post Found", 400);
                }else{
                    $user = User::where('api_token', request("token"))->first();
                    if($user && $post->userid == $user->id){
                        foreach($post->images->all() as $img){
                            File::delete('imgs\\products\\'.$img->filename, 'imgs\\products\\thumbnails\\'.$img->filename);
                        }
                        $post->delete();
                    }else{
                        return Response()->json("Unauthorized Operation", 400);
                    }
                }
            }else{
                return Response()->json("No Post Id Provided", 400);
            }
        }else{
            return Response()->json("No User Token Provided", 400);
        }
    }

    /**
     * Return all tags of a post.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getTags(Request $request)
    {
        try{
            if(!request("id"))
                throw new Exception("id field is required");
            else{
                $thePost = Post::where("id",request("id"))->first();
                if(!$thePost)
                    throw new Exception("Post not found");
                else{
                    $message["tags"] = $thePost->tags;
                    return Response()->json($message, 200);
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return Response()->json($message, 400);
        }
    }
    /**
     * Add new tags to a post
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function addTags(Request $request)
    {
        try{
            if(!request("id"))
                throw new Exception("id field is required");
            else if(!request("tag"))
                throw new Exception("tag field is required");
            else if(!request("token"))
                throw new Exception("token field is required");
            else{
                $thePost = Post::findOrFail(request("id"));
                if($thePost->user->api_token != request("token"))
                    throw new Exception("token is invalid");
                $theTag = Tag::findOrFail(request("tag"));
                $thePost->tags()->attach($theTag);
                $message["error"] = null;
                return Response()->json($message, 200);
            }
        }catch(ModelNotFoundException $e){
            $message["error"] = "post or tag not found";
            return Response()->json($message, 400);
        }catch(QueryException $e){
            $message["error"] = "The tag already exists or Database error";
            return Response()->json($message, 400);
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return Response()->json($message, 400);
        }
    }
    /**
     * Del tags from a post
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function delTags(Request $request)
    {
        try{
            if(!request("id"))
                throw new Exception("id field is required");
            else if(!request("tag"))
                throw new Exception("tag field is required");
            else if(!request("token"))
                throw new Exception("token field is required");
            else{
                $thePost = Post::where("id", request("id"))->first();
                if($thePost->user->api_token != request("token"))
                    throw new Exception("token is invalid");
                if(!$thePost)
                    throw new Exception("post not found");
                $theTag = Tag::where("id", request("tag"))->first();
                if(!$theTag)
                    throw new Exception("tag not found");
                $thePost->tags()->detach($theTag);
                $message["error"] = null;
                return Response()->json($message, 200);
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return Response()->json($message, 400);
        }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try{
            $validator = Validator::make($request->all(),[
                'title' => 'required|string|max:30',
                'quantity' => 'required|integer|min:1|max:1000',
                'price' => 'required|numeric|min:0|max:100000',
                'token' => 'required',
                'description' => 'required|string',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                // DO something
                $post = new Post();
                $post->title = Request("title");
                $post->description = Request("description");
                $post->price = Request("price");
                $post->number = Request("quantity");
                $post->userid = User::where("api_token", Request("token"))->first()->id;
                $post->save();
                return response($post->id, 201);
            }
        }catch(Exception $e){
            return response($e->getMessage(), 406);
        }
    }


    public function getAuthorName($id){
        $user = User::where('id',$id)->first();
        return $user->name;
    }
    /**
     * Return the list of posts by tags=>array
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function showListByTag(Request $request)
    {
        try{
            if(request("tags")){
                $tags = request("tags");
                if(!is_array($tags))
                    throw new Exception("invalid request format");
                $results = [];
                foreach($tags as $tag){
                    $theTag = Tag::where("id", $tag)->first();
                    if($theTag){
                        $results = array_merge($results,$theTag->posts->all());
                        $results = array_unique($results);
                    }
                }
                $message["results"] = $results;
                return Response()->json($message, 200);
            }else{
                throw new Exception("tags field is required");
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 400);
        }

    }
    /**
     * Return the list of posts
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function showList(Request $request)
    {
        $query = null;
        if(Request("keyWord")){
            $key = "%".Request("keyWord")."%";
            if(Request("order")){
                if(Request("order")=="asc"){
                    $query = Post::Where('title', 'like', $key)->orWhere("description", "like", $key)->orderBy("created_at", "asc")->get();
                }else{
                    $query = Post::Where('title', 'like', $key)->orWhere("description", "like", $key)->orderBy("created_at", "desc")->get();
                }
            }else{
                $query = Post::Where('title', 'like', $key)->orWhere("description", "like", $key)->orderBy("created_at", "desc")->get();
            }
        }else{
            if(Request("order")){
                if(Request("order")=="asc"){
                    $query = Post::orderBy("created_at", "asc")->get();
                }else{
                    $query = Post::orderBy("created_at", "desc")->get();
                }
            }else{
                $query = Post::orderBy("created_at", "desc")->get();
            }
        }
        if(Request("minPrice")&&Request("maxPrice")){
            $query = $query->whereBetween('price', [Request("minPrice"),Request("maxPrice")]);
        }else if(Request("minPrice")){
            $query = $query->where('price','>',Request("minPrice"));
        }else if(Request("maxPrice")){
            $query = $query->where('price','<',Request("maxPrice"));
        }
        if(Request("userId")){
            $query = $query->where('userid',Request("userId"));
        }
        $data = $query;
        foreach($data as $r){
            $uid = $r["userid"];
            $r["userid"] = $this->getAuthorName($uid);
        }
        return response()->json($data, 200);
    }

    /**
     * Update a post and save changes
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        try{
            $validator = Validator::make($request->all(),[
                'id' => 'required|integer',
                'title' => 'required|string|max:30',
                'quantity' => 'required|integer|min:1|max:1000',
                'price' => 'required|numeric|min:0|max:100000',
                'token' => 'required',
                'description' => 'required|string',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }
        }catch(Exception $e){
            return response($e->getMessage(), 406);
        }
        $postId = Request("id");
        $postTitle = Request("title");
        $userToken = Request("token");
        $postQuantity = Request("quantity");
        $postDescription = Request("description");
        $postPrice = Request("price");
        try{
            if($postId&&$postTitle&&$postDescription&&$postQuantity&&$postPrice)
            $lePost = Post::where("id", $postId)->first();
            if($lePost){
                $postOwner = User::where("id", $lePost->userid)->first();
                if($postOwner){
                    if($postOwner->api_token==$userToken){
                        $lePost->update([
                            'title' => $postTitle,
                            'number' => $postQuantity,
                            'price' => $postQuantity,
                            'description' => $postDescription,
                            'price' => $postPrice
                        ]);
                        $data["data"] = ["result"=>"success"];
                        $lePost->save();
                        return Response($data, 202);
                    }else{
                        //handle unauthorized error
                        throw new Exception("Unauthorized Operation");
                    }
                }else{
                    //handle not found error
                    throw new Exception("Resource Not Found");
                }
            }else{
                //handle not found error
                throw new Exception("Resource Not Found");
            }
        }catch(Exception $e){
            return response($e->getMessage(), 406);
        }

    }


    /**
     * Return the information of a post
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function Post(Request $request)
    {
        if(Request("id")){
            $the_post = Post::where("id", Request("id"))->first();
            $data["data"] = [
            "postBody"=>$the_post["description"],
            "postTitle"=>$the_post["title"],
            "postDate"=>$the_post["created_at"],
            "owner"=>(User::where("name" ,$the_post["userid"])->first())["name"],
            "price"=>$the_post["price"],
            "quantity"=>$the_post["number"],
            "ownerid"=>$the_post["userid"]];
            return $data;
        }
    }
}
