<?php

namespace App\Http\Controllers;

use App\DamageEntry;
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
        $entries = DamageEntry::orderBy('created_at', 'DESC')->paginate(20);
        return view('dashboard.entries.index')->with('entries', $entries);
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
    public function show(DamageEntry $damageEntry)
    {
        //
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
     * Remove the specified resource from storage.
     *
     * @param  \App\DamageEntry  $damageEntry
     * @return \Illuminate\Http\Response
     */
    public function destroy(DamageEntry $damageEntry)
    {
        //
    }
}
