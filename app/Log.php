<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = "log";
    protected $fillable = [
        'user_id', 'activity','ip_address', 'position','color_code'
    ];

    public function user(){
        return $this->hasOne(User::class,'id','user_id');
    }
}
