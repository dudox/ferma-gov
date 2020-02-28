<?php

namespace App\Http\Controllers;

use App\DamageScreen;
use Illuminate\Http\Request;

class DamageScreenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $screenOne = DamageScreen::where('order', 0)->first();
        $screenTwo = DamageScreen::where('order', 1)->first();
        return view('dashboard.screens.index')->with('screenOne', $screenOne)->with('screenTwo', $screenTwo);
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
     * @param  \App\DamageScreen  $damageScreen
     * @return \Illuminate\Http\Response
     */
    public function show(DamageScreen $damageScreen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DamageScreen  $damageScreen
     * @return \Illuminate\Http\Response
     */
    public function edit(DamageScreen $damageScreen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DamageScreen  $damageScreen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $screenOne = DamageScreen::where('order', 0)->first();
        $screenTwo = DamageScreen::where('order', 1)->first();
        $screenOne->update([
            'value' => $request->first,
        ]);

        $screenTwo->update([
            'value' => $request->second,
        ]);

        return back()->with('success', 'Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DamageScreen  $damageScreen
     * @return \Illuminate\Http\Response
     */
    public function destroy(DamageScreen $damageScreen)
    {
        //
    }
}
