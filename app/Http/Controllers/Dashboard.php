<?php

namespace App\Http\Controllers;

use App\DamageEntry;
use Illuminate\Http\Request;

class Dashboard extends Controller
{
    //
    public function index()
    {
        $entries = new DamageEntry;
        return view('dashboard.index')->with('entries', $entries);
    }
}
