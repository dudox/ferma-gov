<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use Illuminate\Http\Request;

class UploadsController extends Controller
{
    public function index(){
        if (! request()->hasValidSignature()) {
            abort(401);
        } else {
            $phone = request()->phone;
            $user = DamageEntry::with('roads','states')->where('phone',$phone)->orderBy('id','desc')->firstOrFail();
            return view('dashboard.uploads.index',compact('user'));
        }

    }

    public function upload(Request $request){
        $user = DamageEntry::findOrFail($request->id);
        if ($request->hasFile('image')) {

            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/uploads');
            $file = $destinationPath.'/'.$name;
            $user->images = $file;
            $user->save();
            $image->move($destinationPath, $name);

            return back()->with('status','Image Upload successfully');
        }
    }
}
