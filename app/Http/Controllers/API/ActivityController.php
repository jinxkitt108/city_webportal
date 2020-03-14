<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Activity;

class ActivityController extends Controller
{
    public function getEvents() {
       $events = Activity::where('category', 'Events')->orderBy('date', 'desc')->get();
       return $events;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'category' => 'required|string|max:191',
            'title' => 'required|string|max:191',
            'content' => 'required',
        ]);

        if ($request['photo']) {
            $name = time() . '.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];
            $dir = 'storage/activity_photos/';
            if (!is_dir($dir)) {
                mkdir($dir);
            }
            \Image::make($request->photo)->save(public_path($dir) . $name);
        } else {
            $name = null;
        }


        $topic = Activity::create([
            'category' => $request['category'],
            'title' => $request['title'],
            'content' => $request['content'],
            'date' => $request['date'],
            'photo' => $name,
        ]);

        return $topic;
    }
}
