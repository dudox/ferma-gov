<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Concerns\Filterable;

class DamageEntry extends Model
{
    use Filterable;

    protected $fillable = [
        'zone_id',
        'state_id',
        'local_id',
        'road_id',
        'phone',
        'type',
        'status',
        'identifier',
        'name',
    ];

    public function roads()
    {
        return $this->hasOne(Road::class, 'id', 'road_id');
    }
    public function progress()
    {
        return $this->hasOne(DamageStatus::class, 'id', 'status');
    }

    public function states()
    {
        return $this->hasOne(States::class,'state_id','state_id');
    }

    public function zones()
    {
        return $this->hasOne(GeoRegions::class,'id','zone_id');
    }

}
