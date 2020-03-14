<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ForumTopic;
use App\Commentable;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $topics = ForumTopic::latest()->get();
        return $topics;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string|max:191',
            'content' => 'required',
        ]);

        if ($request['photo']) {
            /*  $name = time() . '.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];
            $dir = 'storage/topic_photos/';
            if (!is_dir($dir)) {
                mkdir($dir);
            }
            \Image::make($request->photo)->save(public_path($dir) . $name); */
        } else {
            $name = null;
        }


        $topic = ForumTopic::create([
            'user_id' => auth('api')->user()->id,
            'title' => $request['title'],
            'content' => $request['content'],
            'photo' => $name,
        ]);

        return $topic;
    }

    public function storeComment(Request $request)
    {
        $this->validate($request, [
            'content' => 'required',
        ]);

        $comment = Commentable::create([
            'user_id' => auth('api')->user()->id,
            'commentable_id' => $request['forum_topic_id'],
            'commentable_type' => 'App\ForumTopic',
            'content' => $request['content'],
        ]);
        $comment['author'] = auth('api')->user();

        return $comment;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $topic = ForumTopic::find($id);
        return $topic;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function deleteComment($id)
    {
        $comment = Commentable::find($id);
        $comment->delete();

        return response()->json([
            'commentable_id' => $comment['commentable_id'],
            'id' => $comment['id']
        ]);
    }
}
