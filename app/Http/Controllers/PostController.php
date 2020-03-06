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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showList(Request $request)
    {
        $data["data"] = Post::all();
        foreach($data["data"] as $r){
            $uid = $r["userid"];
            $r["userid"] = $this->getAuthorName($uid);
        }
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
