<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CityOfficial extends Model
{
    protected $fillable = [
        'name', 'position', 'description', 'photo'
    ];
}
