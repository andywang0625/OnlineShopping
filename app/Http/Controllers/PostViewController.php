<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostViewController extends Controller
{
    public function show($name=null){
        if($name){
            return view('postview', ['posts'=> Post::where('title', $name)->orderBy('price')->get()]);
        }else{
            return view('postview',['posts'=>Post::all()]);
        }
    }
}
