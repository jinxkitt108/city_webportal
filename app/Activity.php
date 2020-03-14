<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'category', 'title', 'content', 'date', 'photo'
    ];
}
