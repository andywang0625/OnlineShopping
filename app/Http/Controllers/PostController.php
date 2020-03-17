<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\Http\Controllers\UserController;
use Exception;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Validator;

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

    /**
     * Show the form for creating a new resource.
     *
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
                return response(201);
            }
        }catch(Exception $e){
            return response($e->getMessage(), 406);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }


    public function getAuthorName($id){
        $user = User::where('id',$id)->first();
        return $user->name;
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
            $query = Post::Where('title', 'like', $key)->orWhere("description", "like", $key)->get();
        }else{
            $query = Post::all();
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
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
