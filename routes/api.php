<?php
/*
 * @Author: Kanade
 * @Date: 2020-03-25 03:00:10
 * @LastEditTime: 2020-05-05 05:53:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OnlineShopping\routes\api.php
 */

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

Route::post('register_request','UserController@register');
Route::post('login_request','UserController@login');
Route::post('verify_login',"UserController@isLogin");
Route::post("user/edit", "UserController@EditUser");


Route::GET('img/post/image', 'ImageController@imageList');
Route::POST('img/post_image', 'ImageController@saveItemImg');
Route::GET('img/post/{img}', 'ImageController@getImage');
Route::GET('img/tn/post/{img}', 'ImageController@getThumbnail');
Route::GET('img/postid/{id}', 'ImageController@getImgsOfPost');
Route::POST('img/post/rmimg', 'ImageController@removePostImage');
Route::GET('img/post/cover/{id}', 'ImageController@getCoverImg');


Route::post("posts","PostController@showList");
Route::post("create", "PostController@create");
Route::post("post", "PostController@post");
Route::post("post/getByTags", "PostController@showListByTag");
Route::post("postEdit", "PostController@edit");
Route::post("post/delete", "PostController@delPost");
Route::get("post/tags", "PostController@getTags");
Route::post("post/tags/add", "PostController@addTags");
Route::post("post/tags/del", "PostController@delTags");
Route::get("tags", "TagController@index");


Route::post("message/send", "MessageController@store");
Route::get("messages/sent", "MessageController@indexS");
Route::get("messages/received", "MessageController@indexR");
Route::post("message/remove", "MessageController@destroy");
Route::get("messages/conversations", "MessageController@getConversations");

Route::post("admin/register", "AdminsController@register");
Route::post("admin/login", "AdminsController@login");
Route::post("admin/islogin", "AdminsController@isLogin");
Route::post("admin/post/edit", "AdminsController@EditPost");
Route::post("admin/users", "AdminsController@UserIndex");
Route::get("admin/user", "AdminsController@User");
Route::post("admin/user/update", "AdminsController@UserUpdate");
Route::post("admin/tag/create", "AdminsController@CreateTag");
Route::post("admin/tag/delete", "AdminsController@DeleteTag");
