<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function imageList()
    {
        return response()->download(public_path('imgs/kanade.jpg', 'User Image'));
    }
}
