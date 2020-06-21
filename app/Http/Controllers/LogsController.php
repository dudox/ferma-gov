<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class LogsController extends Controller
{
    public function index(){
        $logs = DB::select('select * from log');
        return view('layouts.logs',['logs'=>$logs]);
    }
}
