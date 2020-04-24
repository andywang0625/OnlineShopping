<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register_request','UserController@register');
Route::post('login_request','UserController@login');
Route::post('verify_login',"UserController@isLogin");
Route::post("posts","PostController@showList");
Route::post("create", "PostController@create");
Route::post("user/edit", "UserController@EditUser");

Route::GET('img/post/image', 'ImageController@imageList');
Route::POST('img/post_image', 'ImageController@saveItemImg');
Route::GET('img/post/{img}', 'ImageController@getImage');
Route::GET('img/tn/post/{img}', 'ImageController@getThumbnail');
Route::GET('img/postid/{id}', 'ImageController@getImgsOfPost');
Route::POST('img/post/rmimg', 'ImageController@removePostImage');
Route::GET('img/post/cover/{id}', 'ImageController@getCoverImg');
//1Route::get('useravatar/{userId}', 'ImageController@getUserAvatar');
Route::post("post", "PostController@post");
Route::post("postEdit", "PostController@edit");

Route::post("post/delete", "PostController@delPost");
//Route::resource('posts{}', 'PostController');
