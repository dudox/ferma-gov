<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DamageEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $entries = DamageEntry::with('roads','states','locals','zones')->groupBy('phone')->orderBy('created_at', 'DESC')->get();
        $mostActive = DamageEntry::selectRaw('count(phone) as phone_count, name, phone')->groupBy('phone')->orderBy('phone_count','desc')->get()->take(5);
        $monthly = DamageEntry::selectRaw('count(*) as total, DATE_FORMAT(created_at, "%m-%Y") as new_date, YEAR(created_at) as year, MONTH(created_at) as month')->groupBy('month','year')->orderBy('month','asc')->get();
        $daily = DamageEntry::whereDate('created_at',Carbon::today())->count();
        $now = Carbon::now();
        $percent = $this->perentage();
        $unique = $this->unique();
        // dd($percent);
        return view('dashboard.entries.index',compact('mostActive','monthly','now','daily','entries','percent','unique'));
    }

    public function perentage(){
        $all = DamageEntry::count();
        $top = DamageEntry::with('roads')->selectRaw('count(road_id) as total, road_id, local_id')->groupBy('road_id')->orderBy('total','desc')->first();
        return  [
            'total'=>round(($top->total / $all)  * 100),
            'name'=>$top->roads->name,
            'local'=>$top->local_id
        ];
    }

    public function unique(){
        return DamageEntry::groupBy('road_id')->get();
    }

    public function api(){

        $entries = DamageEntry::with('roads','states','locals','zones')->groupBy('phone')->orderBy('created_at', 'DESC')->get();
        $data = [];
        $count =1;
        foreach($entries as $entry){
            $data[] = [
                "ID"=> $count++,
                "Name"=> [ucfirst($entry->name),$entry->phone],
                "Region"=> $entry->zones->zone,
                "State"=> $entry->states->name,
                "Local Govt"=> $entry->locals->local_name,
                "Road"=> $entry->roads->name,
                "Date"=> date("d M, Y", strtotime($entry->created_at)),
            ];
        }


        return [

            "aaData"=> $data
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DamageEntry  $damageEntry
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $entries = DamageEntry::where('phone',$id)->get();
        if($entries->isEmpty()):
            abort(404);
        else:
            $roads = DamageEntry::with('roads')->selectRaw('COUNT(road_id) as total, road_id')->groupBy('road_id')->where('phone',$id)->orderBy('id','desc')->get()->take(5);
            $reports = DamageEntry::with('roads','zones','locals','states')->where('images','<>','')->where('phone',$id)->get();
            $users = DamageEntry::groupBy('phone')->where('phone',$id)->count();

        endif;
        //dd($users);
        return view('dashboard.entries.single.index',compact('entries','roads','reports','users'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DamageEntry  $damageEntry
     * @return \Illuminate\Http\Response
     */
    public function edit(DamageEntry $damageEntry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DamageEntry  $damageEntry
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DamageEntry $damageEntry)
    {
        //
        $damageEntry->update([
            'status' => $request->status,
        ]);
        return back();
    }

    /**
     * Remove all entries.
     *
     * @param  \App\DamageEntry  $damageEntry
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        if(!$request->confirm || $request->confirm !== 'confirm') return back()->with('error', 'Please Confirm Request');
        DamageEntry::whereNotNull('id')->delete();
        return back()->with('success', 'Records Cleared Successfully!!');
    }
}
