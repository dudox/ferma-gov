<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DamageEntry extends Model
{
    //
    protected $fillable = [
        'location',
        'phone',
        'type',
        'status',
        'identifier',
        'name',
    ];

    public function degree()
    {
        return $this->hasOne(DamageType::class, 'id', 'type');
    }
    public function progress()
    {
        return $this->hasOne(DamageStatus::class, 'id', 'status');
    }
}
