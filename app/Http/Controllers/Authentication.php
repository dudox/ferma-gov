<?php

namespace App\Http\Controllers;

use App\Http\Requests\Login;
use Request;
use Illuminate\Support\Facades\Auth;
use App\Log;
use Stevebauman\Location\Facades\Location;

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
            $place = Location::get('ip_address');
            Log::create([
                'user_id'=>auth()->user()->id,
                'activity'=> "user logged in",
                'ip_address' => Request::ip(),
                'position' => $place->regionName. ", " .$place->countryName,
                'color_code'=>'label-light-success'
            ]);
            return redirect()->route('dashboard');
        }

        return back()->with('error', 'Invalid credentials');
    }

    public function logout()
    {
        $place = Location::get('ip_address');
        Log::create([
            'user_id'=>auth()->user()->id,
            'activity'=> "user logged out",
            'ip_address' => Request::ip(),
            'position' => $place->cityName. ", " .$place->countryName,
            'color_code'=>'label-light-danger'
        ]);
        Auth::logout();
        return redirect()->route('login');
    }

}
