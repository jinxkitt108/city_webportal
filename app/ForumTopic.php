<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForumTopic extends Model
{
    protected $fillable = [
        'user_id', 'title', 'content', 'photo'
    ];

    protected $with = [
        'author',
        'commentable'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function commentable()
    {
        return $this->hasMany('App\Commentable', 'commentable_id');
    }
}
