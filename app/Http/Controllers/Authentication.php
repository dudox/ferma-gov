<?php

namespace App\Http\Controllers;

use App\Http\Requests\Login;
use Request;
use Illuminate\Support\Facades\Auth;
use App\Log;
use App\User;
use Illuminate\Support\Facades\Hash;
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

    public function accounts(){
        $users = User::with('regions')->findOrFail(Auth::user()->id);
        return view('dashboard.accounts.index',compact('users'));
    }

    public function personal(){
        $user = User::find(Auth::user()->id);
        $user->name = request()->name;
        $user->email = request()->email;
        if($user->save()){
            return redirect()->back()->with(['personal'=> 'Changes saved!']);

        }
    }

    public function password(){
        $user = User::find(Auth::user()->id);
        request()->validate([
            'old' => 'required',
            'password' => 'required|min:6',
            'confirm' => 'required_with:password|same:password|min:6'
        ]);

        if(Hash::check(request()->old, $user->password)){
            $user->password = Hash::make(request()->password);
            if($user->save()){
                return redirect()->back()->with(['password'=> 'Changes saved!','color'=>'primary']);
            } else {
                $res = redirect()->back()->with(['password'=> 'Changes saved!','color'=>'primary']);
            }

        } else {
            return redirect()->back()->with(['password'=> 'Password inocrrect!','color'=>'danger']);
        }
    }

}
