<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\User;
use App\UserCode;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::latest()->get();
        return $users;
    }

    public function getAllCodes()
    {
        $codes = UserCode::latest()->get();
        foreach ($codes as $code) {
            $span = $code->availability;
            if (Carbon::today() > $span) {
                $code->availability = 'Expired';
            }
        }
        return $codes;
    }

    public function getCode()
    {
        $code = Str::random(6);
        $user_code = UserCode::create([
            'code' => $code,
            'availability' => Carbon::today()->addWeeks(1)
        ]);

        return $user_code;
    }

    public function validateCode(Request $request)
    {
        $this->validate($request, [
            'code' => 'required|string|max:6',
        ]);

        $check = UserCode::where('code', $request['code'])->count();
        if ($check) {
            return response()->json([
                'status' => 'success',
                'valid' => true
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'valid' => false
            ]);
        }
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
            'name' => 'required|string|max:191',
            'username' => 'required|string|max:191|unique:users',
            'email' => 'required|string|email|max:191|unique:users',
            'password' => 'required|string|min:8'
        ]);
        $code = Str::random(6);
        $user =  User::create([
            'name' => $request['name'],
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'permissions' => 'User',
            'code' => $code
        ]);

        return $user;
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:191',
            'username' => 'required|string|max:191|unique:users',
            'email' => 'required|string|email|max:191|unique:users',
            'password' => 'required|string|min:8'
        ]);

        $user =  User::create([
            'name' => $request['name'],
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'permissions' => 'User',
            'code' => $request['code']
        ]);

        if ($user) {
            $code = UserCode::where('code', $user->code);
            $code->delete();
            Auth::attempt(['username' => $user->username, 'password' => $user->password]);
            return $user;
        }
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
}
