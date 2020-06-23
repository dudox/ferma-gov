<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use App\GeoRegions;
use App\Http\Filters\FilterDamage;
use App\Road;
use App\User;
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
        $percentile = $this->reports_percentile();
        $total_reports = $this->list_reports();
        $roads_prior = $this->list_reported_road_order();
        $reports_zone = $this->get_zone_reports();
        $users = $this->list_administrator();

        return view('dashboard.index',compact(
            'entry_overall',
            'zones',
            'recent_entry',
            'percentile',
            'total_reports',
            'roads_prior',
            'reports_zone',
            'users'));
    }

    function list_geo_zones(){
        return GeoRegions::with('states.locals.roads')->get();
    }

    function list_recent_reports(){
        return DamageEntry::with('roads.progress','states')->orderBy('id','DESC')->get()->take(7);
    }

    public function reports_percentile(){
        $total = Road::count();
        $one = Road::where('status','1')->count();
        $two = Road::where('status','2')->count();
        $three = Road::where('status','3')->count();

        $pending = ($one / $total) * 100;
        $ongoing = ($two / $total) * 100;
        $completed = ($three / $total) * 100;

        return array(
            [$pending,"warning","Pending"],
            [$ongoing,"info","Ongoing"],
            [$completed,"danger","Completed"],
        );
    }

    public function list_reports(){
        return DamageEntry::get();
    }

    public function list_reported_road_order(){
        return DamageEntry::selectRaw('COUNT(*) as total, road_id, state_id, zone_id')->with(['roads.progress' => function($query) {
            $query->select('id', 'name','description','color_code');
        },
        'states'=> function($query){
            $query->select('state_id', 'name');
        },'zones'=> function($query){
            $query->select('id', 'zone');
        }])
        ->groupBy('road_id')->orderBy('total','DESC')->get()->take(5);
    }

    public function get_zone_reports(){
        $geos = GeoRegions::with('reports')->withCount('reports')->get();
        $data = [];
        foreach ($geos as $geo) {
            $data []= $geo->reports_count;
        }
        return $data;
    }

    public function list_administrator(){
        return User::get();
    }
}
