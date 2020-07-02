<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function index(){
        return view('dashboard.admin.index');
    }
    public function create(Request $request){
       dd($request)        ;
    }
}
