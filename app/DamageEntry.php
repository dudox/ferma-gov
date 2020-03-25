<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Concerns\Filterable;

class DamageEntry extends Model
{
    use Filterable;

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
