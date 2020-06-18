<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use App\Http\Filters\FilterDamage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Dashboard extends Controller
{
    //
    public function index(FilterDamage $filter)
    {
        $entry_overall = DamageEntry::with('degree','progress')->get();
        $pendingValues = [];
        $ongoingValues = [];
        $completedValues = [];
        $a = 1;
        while($a <= 12) {
            if(strlen($a) < 2) {
                $a = '0'.$a;
            }
            $pendingValues[] = DamageEntry::filter($filter)
                ->whereMonth('created_at', $a)
                ->where('status', 1)
                ->count();
            $ongoingValues[] = DamageEntry::filter($filter)
                ->whereMonth('created_at', $a)
                ->where('status', 2)
                ->count();

            $completedValues[] = DamageEntry::filter($filter)
                ->whereMonth('created_at', $a)
                ->where('status', 3)
                ->count();
            $a++;
        }

        $entries = DamageEntry::filter($filter);
        $ong = DamageEntry::filter($filter);
        $comp = DamageEntry::filter($filter);
        $pend = DamageEntry::filter($filter);
        $start = DamageEntry::orderBy('created_at', 'ASC')->first();
        $presentYear = date("Y", time());
        if($start) {
            $start = date("Y", strtotime($start->created_at));
        }
        else {
            $start = $presentYear;
        }
        $array = [$start];
        if(DamageEntry::count()) {
            while($start < $presentYear) {
                $start++;
                $array[] = $start;
            }
        }

        return view('dashboard.index',compact('entry_overall'));
    }
}
