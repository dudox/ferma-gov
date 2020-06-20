<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = "log";
    protected $fillable = [
        'user_id', 'activity',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
