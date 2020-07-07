<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Locals extends Model
{
    protected $table = "locals";

    public function roads(){
        return $this->hasMany(Road::class,'local_id','local_id');
    }

    public function state(){
        return $this->belongsTo(States::class,'state_id','state_id');
    }
}
