<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GeoRegions extends Model
{
    public function states(){
        return $this->hasMany(States::class,'zone_id');
    }


    public function reports(){
        return $this->hasMany(DamageEntry::class,'zone_id');
    }

    public function roads()
    {
        return $this->hasManyThrough('App\Road', 'App\Locals','state_id','local_id','state_id','local_id');
    }
}
