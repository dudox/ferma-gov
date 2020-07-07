<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use App\DamageStatus;
use App\GeoRegions;
use App\Health;
use App\Locals;
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
        $roads = Road::with('progress','local.state.region')->get();
        $data = [];
        foreach($roads as $road){
            $data[] = [
                "Road"=> $road->name,
                "Regions"=> $road->local->state->region->zone,
                "State"=> $road->local->state->name,
                "Status"=> $road->status,
                "Road Health"=> ucfirst($this->health($road->id)[2]),
                "LGA"=>$road->local->local_name,
                "Actions"=> route('roads.single',str_replace(' ','_',$road->name))
            ];
        }

        return  [
            "iTotalRecords"=> count($data),
            "iTotalDisplayRecords"=> count($data),
            "sEcho"=> 0,
            "aaData"=> $data

        ];
    }

    public function single($id){
        $road = Road::with('progress')->where('name',str_replace('_',' ',$id))->firstOrFail();
        $local = Locals::where('local_id',$road->local_id)->first();
        $state = States::where('state_id',$local->state_id)->first();
        $region = GeoRegions::where('id',$state->zone_id)->first();
        $reports = DamageEntry::where('road_id',$road->id)->get();
        $images = DamageEntry::where('road_id',$road->id)->where('images','<>','')->get();
        $users = DamageEntry::orderBy('phone')->where('road_id',$road->id)->get();
        $monthly = DamageEntry::selectRaw('count(*) as total, DATE_FORMAT(created_at, "%m-%Y") as new_date, YEAR(created_at) as year, MONTH(created_at) as month')->groupBy('month','year')->orderBy('month','asc')->where('road_id',$road->id)->get();
        $health = $this->health($road->id);
        //dd($this->health($road->id));

        return view('dashboard.roads.single.index',compact('road','local','state','region','reports','users','monthly','health','images'));
    }

    public function health($id){
        $last = DamageStatus::where('id',3)->first();
        $all = DamageEntry::where('created_at','>=',date('Y-m-d',strtotime($last->updated_at)))->where('road_id',$id)->get();
        $health = Health::get();
        $count = count($all);
        $data = ['100','success','Excellent'];
        if($count > 0){

            foreach($health as $check){
                if($count >= $check->cap){
                    $data = [
                        round( 100 - (($check->cap / $count) * 100)),
                        $check->color,
                        $check->name,
                        $check->description
                    ];
                }
            }
        }

        return $data;
    }

    public function switches(Request $request){
        $road = Road::find($request->id);
        $road->status = $request->status;
        $road->save();
        $status = DamageStatus::find($request->status);
        return response()->json(['status'=>'success','message'=>'Construction status has been set to '.$status->name], 200);
    }
}
