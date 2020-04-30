<?php
/*
 * @Author: Kanade
 * @Date: 2020-04-26 08:26:03
 * @LastEditTime: 2020-04-29 22:51:36
 * @Description:
 */

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use Throwable;
use App\User;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */

    public function getConversations(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                "token" => 'required',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $user = User::where("api_token", request("token"))->first();
                if(!$user)
                    throw new Exception("User not found");
                else{
                    $receivers = [];
                    $conversations = [];
                    $messages = $user->messagesReceived->sortByDesc('created_at');
                    // Low performance method
                    foreach($messages as $theMessage){
                        $newConversation = array();
                        if(!in_array($theMessage->senderid, $receivers)){
                            array_push($receivers, $theMessage->senderid);
                            $newConversation["senderid"] = $theMessage->senderid;
                            $newConversation["sendername"] = User::where('id', $theMessage->senderid)->first()->name;
                            $newConversation["lasttime"] = $theMessage->created_at->format("Y-m-d  H:i");
                            array_push($conversations, (object)$newConversation);
                        }
                    }
                    $message["conversations"] = array_values($conversations);
                    return Response()->json($message, 200);
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return Response()->json($message, 404);
        }
    }
    public function indexS(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                "token" => 'required',
                "targetId" => 'required',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $user = User::where("api_token", request("token"))->first();
                if(!$user)
                    throw new Exception("User not found");
                else{
                    $messages["messages"] = array_values($user->messagesSentToTarget(request("targetId")));
                    return Response()->json($messages, 200);
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return Response()->json($message, 404);
        }
    }

        /**
     * Display a listing of the resource.
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function indexR(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                "token" => 'required',
                "targetId" => 'required',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $user = User::where("api_token", request("token"))->first();
                if(!$user)
                    throw new Exception("User not found");
                else{
                    $data["messages"] = array_values($user->messagesReceivedFromTarget(request("targetId")));
                    return Response()->json($data, 200);
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return Response()->json($message, 404);
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
        try{
            $validator = Validator::make($request->all(), [
                'token' => 'required',
                'message' => 'required|max:200|string',
                'reciever' => 'required',
            ]);
            if($validator->fails()){
                throw new Exception($validator->messages()->first());
            }else{
                $sender = User::where("api_token", request("token"))->first();
                if(!$sender){
                    throw new Exception("User not found");
                }else{
                    if($sender->id==request("reciever")){
                        throw new Exception("You cannot send message to yourself");
                    }else{
                        $message = new Message;
                        $message->content = request("message");
                        $message->senderid = $sender->id;
                        $message->targetid = request("reciever");
                        $message->save();
                        $response["error"] = null;
                        return response()->json($response, 200);
                    }
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return response()->json($message, 406);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token'=>'required',
            'id' => 'required',
        ]);
        try{
            if($validator->fails())
                throw new Exception($validator->messages()->first());
            else{
                $user = User::where("api_token",request("token"))->first();
                if(!$user){
                    throw new Exception("User not found");
                }else{
                    $theMessage = Message::where("id", request("id"))->first();
                    if(!$theMessage)
                        throw new Exception("Message not found");
                    else{
                        if($theMessage->senderid == $user->id){
                            $theMessage->delete();
                            $message["error"] = null;
                            return Response()->json($message, 200);
                        }else{
                            throw new Exception("Method not allowed");
                        }
                    }
                }
            }
        }catch(Exception $e){
            $message["error"] = $e->getMessage();
            return Response()->json($message, 406);
        }
    }
}
