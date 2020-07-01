<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use App\GeoRegions;
use App\Road;
use App\States;
use Illuminate\Http\Request;

class RoadsController extends Controller
{
    public function index($region,$state){
        $regions = GeoRegions::with(['states' => function($q) use($state){
            return $q->where('name',str_replace('_',' ',$state))->firstOrFail();
        }])->where('zone',str_replace('_',' ',$region))->firstOrFail();

        $state_id = $regions->states[0]->state_id;
        $zone_id = $regions->id;

        $roads = States::with('roads','locals')->withCount('roads')->where('state_id',$state_id)->first();
        $reports = DamageEntry::where('state_id',$roads->state_id)->get();

        // precentile within regions
        $prr = $this->percentage_reports_regions($zone_id,$state_id);
        $prt = $this->percentage_reports_total($state_id);
        $reportsImages = $this->get_roads_reports_w_images($state_id);

        //dd($grrwm);


        return view('dashboard.roads.index',compact('regions','roads','reports','prr','prt','reportsImages'));
    }


    public function percentage_reports_regions($zone_id,$state_id){
        $others = DamageEntry::where('zone_id',$zone_id)->count();
        $current = DamageEntry::where('state_id',$state_id)->count();
        $ratio = null;
        if($others + $current == 0){
            $ratio = 0;
        } else {
            $ratio = ($current / $others) * 100;
        }
        return $ratio;



    }

    public function percentage_reports_total($state_id){
        $others = DamageEntry::count();
        $current = DamageEntry::where('state_id',$state_id)->count();
        $ratio = null;
        if($others + $current == 0){
            $ratio = 0;
        } else {
            $ratio = ($current / $others) * 100;
        }
        return $ratio;

    }

    public function get_roads_reports_w_images($state_id){
        return DamageEntry::with('roads','locals')->where('state_id',$state_id)->where('images','<>',null)->orderBy('id','DESC')->get()->unique('road_id');
    }

    public function general(){
        return view('dashboard.roads.general.index');
    }

    public function api(){
        $regions = GeoRegions::get();
        $roads = Road::get();

        return response()->json(['data'=>
            [
                    1=>'Ahmed',2,3,4,5
            ]
        ], 200);
    }
}
