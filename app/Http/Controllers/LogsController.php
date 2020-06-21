<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class LogsController extends Controller
{
    public function index(){
        $data = DB::select('select * from log');
        
        foreach($data as $dat){
            $user = DB::table('users')->where('id', $dat->user_id);
            $dat = [
                'id'=> $dat->id,
                'name'=> $user->value('name'),
                'activity'=>$dat->activity,
                'ip_address'=> $dat->ip_address,
                'position'=> $dat->position,
                'created_at'=> $dat->created_at,
                'email'=> $user->value('email'),
            ];
            $logs[] = $dat;
        }
        
        return view('layouts.logs',['logs'=>$logs]);
    }
}
