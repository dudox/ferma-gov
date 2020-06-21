<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class States extends Model
{
    protected $table = "states";

    public function locals(){
        return $this->hasMany(Locals::class,'state_id','state_id');
    }

    public function zones(){
        return $this->hasOne(GeoRegions::class,'id','state_id');
    }

}
