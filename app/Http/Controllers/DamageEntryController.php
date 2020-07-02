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
        $entries = DamageEntry::with('roads','states','locals','zones')->groupBy('phone')->orderBy('created_at', 'DESC')->paginate(20);
        $mostActive = DamageEntry::selectRaw('count(phone) as phone_count, name, phone')->groupBy('phone')->orderBy('phone_count','desc')->get()->take(5);
        $monthly = DamageEntry::selectRaw('count(*) as total, DATE_FORMAT(created_at, "%m-%Y") as new_date, YEAR(created_at) as year, MONTH(created_at) as month')->groupBy('month','year')->orderBy('month','asc')->get();
        $daily = DamageEntry::where('created_at',Carbon::today())->count();
        $now = Carbon::now();
        $percent = $this->perentage();
        $unique = $this->unique();
        // dd($percent);
        return view('dashboard.entries.index',compact('mostActive','monthly','now','daily','entries','percent','unique'));
    }

    public function perentage(){
        $all = DamageEntry::count();
        $top = DamageEntry::with('roads')->selectRaw('count(road_id) as total, road_id')->groupBy('road_id')->orderBy('total','desc')->first();
        return  [
            'total'=>round(($top->total / $all)  * 100),
            'name'=>$top->roads->name
        ];
    }

    public function unique(){
        return DamageEntry::groupBy('road_id')->count();
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
        endif;
        return view('dashboard.entries.single.index',compact('entries','roads'));
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
