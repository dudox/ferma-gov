<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB as FacadesDB;

class LogsController extends Controller
{
    public function index(){
        $logs = FacadesDB::select('select * from log');
        return view('dashboard.logs.index',['logs'=>$logs]);
    }
}
