<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Road extends Model
{
    protected $table = "roads";


    public function local(){
        return $this->hasMany(Locals::class);
    }

    public function degree()
    {
        return $this->hasOne(DamageType::class, 'id', 'type');
    }
    public function progress()
    {
        return $this->hasOne(DamageStatus::class, 'id', 'status');
    }


}
