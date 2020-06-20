<?php

namespace App\Http\Controllers;

use App\Http\Requests\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Log;

class Authentication extends Controller
{
    //
    public function index()
    {
        return view('auth.login');
    }

    public function login(Login $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            Log::create([
                'user_id'=>auth()->user()->id,
                'activity'=> "user logged in",
            ]);
            return redirect()->route('dashboard');
        }

        return back()->with('error', 'Invalid credentials');
    }

    public function logout()
    {
        Log::create([
            'user_id'=>auth()->user()->id,
            'activity'=> "user logged out",
        ]);
        Auth::logout();
        return redirect()->route('login');
    }
}
