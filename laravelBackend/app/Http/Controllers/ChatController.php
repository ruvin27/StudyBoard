<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserModel;
use App\Models\Message;

class ChatController extends Controller
{
    public function getAllEmails()
    {
        $emails = UserModel::pluck('email')->toArray();

        return response()->json($emails);
    }

    public function getMessages(Request $request){
        $sender = $request->input('sender');
        $receiver = $request->input('receiver');

        $messages = Message::where(function ($query) use ($sender, $receiver) {
            $query->where('sender', $sender)->where('receiver', $receiver);
        })->orWhere(function ($query) use ($sender, $receiver) {
            $query->where('sender', $receiver)->where('receiver', $sender);
        })->get();

        $formattedMessages = $messages->map(function ($message) use ($sender) {
            return [
                'sender' => ($message->sender === $sender) ? 'You' : $message->sender,
                'message' => $message->message,
            ];
        });

        return response()->json($formattedMessages);

    }

    public function storeMessage(Request $request)
    {
        $sender = $request->input('sender');
        $receiver = $request->input('receiver');
        $message = $request->input('message');

        $newMessage = Message::create([
            'sender' => $sender,
            'receiver' => $receiver,
            'message' => $message,
        ]);
    }
}
