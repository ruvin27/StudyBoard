<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function storeContactResponse(Request $request){
        $email = $request->input('email');
        $message = $request->input('message');

        $response = Contact::create([
            'email' => $email,
            'message' => $message,
        ]);

        if($response){
            return response()->json(['code' => 200, 'status' => 'success', 'data' => null, 'message' => 'Response sent']);
        }else{
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Response could not be stored']);

        }
    }

    public function listAll()
    {
        $responses = Contact::get();

        return response()->json(['data' => $responses], 200);
    }
}
