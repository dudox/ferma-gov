<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LogsController extends Controller
{
    public function index(){

        return view('dashboard.logs.index');


    }

    public function logs(){
        $logs = Log::with('user')->orderBy('id','DESC')->get();
        $data = null;

        foreach($logs as $log){
            $status = [
                'title'=>$log->activity,
                'class'=>$log->color_code
            ];
            $data[] = [
                'RecordID' => $log->id,
                'User Info'=> $log->user,
                'Location'=>$log->position,
                'Ip Address'=>$log->ip_address,
                'timestamp'=>'<i class="fa fa-calendar fa-sm text-primary"></i> &nbsp;'.date("d M, Y",strtotime($log->created_at)).'<br><i class="fa fa-clock fa-sm "></i> &nbsp;'.date("h:sa",strtotime($log->created_at)),
                'status'=>$status
            ];
        }
        return response()->json($data, 200);
    }
}
