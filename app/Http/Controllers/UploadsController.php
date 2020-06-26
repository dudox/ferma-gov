<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

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
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $path = "uploads";
            $location = $path.'/'.$imageName;
            Storage::disk('uploads')->put($location,  File::get($request->image));

            $user->images = $location;
            $user->save();

            return back()->with('status','Image Upload successfully');
        }
    }
}
