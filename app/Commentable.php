<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commentable extends Model
{
    protected $fillable = [
        'user_id', 'commentable_id', 'commentable_type', 'content'
    ];

    protected $with = [
        'author'
    ];

    public function author()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
