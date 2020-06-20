<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use App\GeoRegions;
use App\Http\Filters\FilterDamage;
use App\Road;
use GeoRegionsSeeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Dashboard extends Controller
{
    //
    public function index(FilterDamage $filter)
    {
        $entry_overall = Road::with('degree','progress')->get();
        $recent_entry = $this->list_recent_reports();
        $zones = $this->list_geo_zones();

        return view('dashboard.index',compact('entry_overall','zones','recent_entry'));
    }

    function list_geo_zones(){
        return GeoRegions::with('states.locals.roads')->get();
    }

    function list_recent_reports(){
        return DamageEntry::with('roads.progress','states')->orderBy('id','DESC')->get()->take(7);
    }

    // public function reports_percentile($){
    //     Road::where('')->count;
    // }
}
