<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function index(){
        return view('dashboard.admin.index');
    }
    public function admins(){

        return view('dashboard.admin.profiles');


    }
    public function create(Request $request){
        $this->validate(request(), [
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email|unique:users',
            'region'=> 'nullable',
            'role' => 'required|string',
            'password' => 'required|min:8',
        ]);
      $user = new User;
      $user->name = $request->firstname . ", " . $request->lastname;
      $user->email = $request->email;
      $user->region_id = $request->region ?? "";
      $user->role = $request->role;
      $user->password = Hash::make($request->password);
      if($user->save()){
         return redirect()->back()->with('message', 'User '. $user->name .' created successfully');
      }else{

      }

    }
    public function profiles(){
        $profiles = User::all();
        $data = null;

        foreach($profiles as $profile){
            $data[] = [
                'id' => $profile->id,
                'name'=> $profile->name,
                'email'=> $profile->email,
                'region'=> DB::table('geo_regions')->where('id', $profile->region_id)->pluck('zone'),
                'role'=>$profile->role=="1"? 'Regional Supervisor' : 'National Supervisor',
                'timestamp'=>'<i class="fa fa-calendar fa-sm text-primary"></i> &nbsp;'.date("d M, Y",strtotime($profile->created_at)).'<br><i class="fa fa-clock fa-sm "></i> &nbsp;'.date("h:sa",strtotime($profile->created_at)),
            ];
        }
        return response()->json($data, 200);
    }
}
