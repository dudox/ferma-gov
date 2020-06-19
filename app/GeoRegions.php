<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GeoRegions extends Model
{
    public function states(){
        return $this->hasMany(States::class,'zone_id');
    }
}
