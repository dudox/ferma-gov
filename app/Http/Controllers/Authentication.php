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
            $place = \Location::get('ip_address');
            Log::create([
                'user_id'=>auth()->user()->id,
                'activity'=> "user logged in",
                'ip_address' => \Request::ip(),
                'position' => $place->cityName. ", " .$place->countryName,
            ]);
            return redirect()->route('dashboard');
        }

        return back()->with('error', 'Invalid credentials');
    }

    public function logout()
    {
        $place = \Location::get('ip_address');
        Log::create([
            'user_id'=>auth()->user()->id,
            'activity'=> "user logged out",
            'ip_address' => \Request::ip(),
            'position' => $place->cityName. ", " .$place->countryName,
        ]);
        Auth::logout();
        return redirect()->route('login');
    }
}
