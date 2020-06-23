<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use App\GeoRegions;
use App\Locals;
use App\Road;
use App\States;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegionsController extends Controller
{
    public function states($id){
        $zone = GeoRegions::with('states.roads')->where('zone',str_replace('_', ' ', $id))->first();
        $states = States::with('locals')->where('zone_id',$zone->id)->get();
        $roads = array();
        foreach($zone->states as $item){
            $data = $item->roads;
            foreach($data as $key => $road){
                $roads [] = $road;
            }
        }
        // $locals = $state->Locals()->get();

        $reports = DamageEntry::where('zone_id',$zone->id)->get();

        return view('dashboard.regions.single.index',compact('states','zone','reports','roads'));
    }
}
