<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Locals extends Model
{
    protected $table = "locals";

    public function roads(){
        return $this->hasMany(Road::class,'local_id','local_id');
    }
}
