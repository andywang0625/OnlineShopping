<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use App\PostImages;
use App\Post;
use Exception;
use Facade\FlareClient\Http\Response;

class ImageController extends Controller
{
    public function imageList()
    {
        return response()->download(public_path('imgs/kanade.jpg', 'User Image'));
    }
    // public function getUserAvatar(Request $request, $userId){
    //     return response()->download(public_path('imgs/avatar/'.$userId.".png"));
    // }
    public function getImage(Request $request){
        try{
            if(Request("img")){
                $img = Request("img");
                return response()->download(public_path('imgs\\products\\'.$img));
            }else{
                throw new Exception();
            }
        }catch(Exception $e){
            return Response("Not Found", 404);
        }
    }

    public function getThumbnail(Request $request){
        try{
            if(Request("img")){
                $img = Request("img");
                return response()->download(public_path('imgs\\products\\thumbnails\\'.$img));
            }else{
                throw new Exception();
            }
        }catch(Exception $e){
            return Response("Not Found", 404);
        }
    }

    public function saveItemImg(Request $request)
    {
        request()->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
            'postid' => 'required|string',
        ]);
        try{
            $post = Post::where('id',Request("postid"))->first();
            if($post){
                if($img = $request->file('photo')){
                    $imgUpload = Image::make($img);
                    $uploadPath = 'imgs\\products\\';
                    $thumbnailPath = 'imgs\\products\\thumbnails\\';

                    if (!file_exists($uploadPath)) {
                        mkdir($uploadPath, 666, true);
                    }
                    if (!file_exists($thumbnailPath)) {
                        mkdir($thumbnailPath, 666, true);
                    }

                    $imgUpload->save($uploadPath.time().$img->getClientOriginalName());
                    $imgUpload->resize(250, 125);
                    $imgUpload = $imgUpload->save($thumbnailPath.time().$img->getClientOriginalName());

                    $newImg = new PostImages();
                    $newImg->postid = Request("postid");
                    $newImg->filename = time().$img->getClientOriginalName();
                    $newImg->save();
                }
            }else{
                throw new Exception("You have not published your post!");
            }

            $image = PostImages::latest()->first(['filename']);
            return Response()->json($image);
        }catch(Exception $e){
            return Response($e->getMessage(), 406);
        }
    }
}
