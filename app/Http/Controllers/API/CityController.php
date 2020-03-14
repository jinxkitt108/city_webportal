<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CityOfficial;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getOfficers()
    {
        $officers = CityOfficial::latest()->get();
        return $officers;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function storeOfficer(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:191',
            'position' => 'required|string|max:191',
            'description' => 'required',
        ]);

        if ($request['photo']) {
            $name = time() . '.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];
            $dir = 'storage/city_officials/';
            if (!is_dir($dir)) {
                mkdir($dir);
            }
            \Image::make($request->photo)->save(public_path($dir) . $name);
        } else {
            $name = 'profile.png';
        }

        $officer = CityOfficial::create([
            'name' => $request['name'],
            'position' => $request['position'],
            'description' => $request['description'],
            'photo' => $name,
        ]);

        return $officer;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateOfficer(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string|max:191',
            'position' => 'required|string|max:191',
            'description' => 'required',
        ]);
        $officer = CityOfficial::find($id);

        if ($request['photo']) {
            $name = time() . '.' . explode('/', explode(':', substr($request['photo'], 0, strpos($request['photo'], ';')))[1])[1];
            $dir = 'storage/city_officials/';
            \Image::make($request['photo'])->save(public_path('storage/city_officials/') . $name);
            $request->merge(['photo' => $name]);

            $currentPhoto = $officer->photo;
            //Deleting current profile photo
            if ($currentPhoto != 'profile.png') {
                $photo = public_path('storage/city_officials/') . $currentPhoto;
                if (file_exists($photo)) {
                    @unlink($photo);
                }
            }
        }

        $update = $officer->update($request->all());
        if ($update) {
            $officer = CityOfficial::find($id);
            return $officer;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function deleteOfficer($id)
    {
        $officer = CityOfficial::find($id);
        $currentPhoto = $officer->photo;
        //Deleting current profile photo
        if ($currentPhoto != 'profile.png') {
            $photo = public_path('storage/city_officials/') . $currentPhoto;
            if (file_exists($photo)) {
                @unlink($photo);
            }
        }

        $officer->delete();

        return response()->json([
            'status' => 'success',
            'officer_id' => $id,
            'message' => 'Officer Deleted!',
        ]);
    }
}
