<?php
/*
 * @Author: Kanade
 * @Date: 2020-05-05 04:26:25
 * @LastEditTime: 2020-05-05 04:28:54
 * @Description:
 */

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $message["tags"] = Tag::all();
        return Response()->json($message, 200);
    }
}
