<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCode extends Model
{
    protected $fillable = [
        'code', 'availability'
    ];
}
