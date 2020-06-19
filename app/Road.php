<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Road extends Model
{
    protected $table = "roads";
    public function local(){
        return $this->belongsTo(Locals::class);
    }
}
