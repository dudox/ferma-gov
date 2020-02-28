<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Dashboard extends Controller
{
    //
    public function index()
    {
        $pendingValues = [];
        $ongoingValues = [];
        $completedValues = [];
        $a = 1;
        while($a <= 12) {
            if(strlen($a) < 2) {
                $a = '0'.$a;
            }
            $pendingValues[] = DB::table("damage_entries")
                ->whereRaw('MONTH(created_at) = ?',[$a])
                ->where('status', 1)
                ->count();
            $ongoingValues[] = DB::table("damage_entries")
                ->whereRaw('MONTH(created_at) = ?',[$a])
                ->where('status', 2)
                ->count();

            $completedValues[] = DB::table("damage_entries")
                ->whereRaw('MONTH(created_at) = ?',[$a])
                ->where('status', 3)
                ->count();
            $a++;
        }

        $entries = new DamageEntry;
        return view('dashboard.index')->with('entries', $entries)
        ->with('pendingValues', $pendingValues)
        ->with('ongoingValues', $ongoingValues)
        ->with('completedValues', $completedValues);
    }
}
