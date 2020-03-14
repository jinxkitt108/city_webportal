<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Users Routes
Route::apiResources(['user' => 'API\UserController']);
Route::post('register', 'API\UserController@register');
Route::get('code', 'API\UserController@getCode');
Route::post('code_validation', 'API\UserController@validateCode');
Route::get('all_code', 'API\UserController@getAllCodes');

//Forum Routes
Route::apiResources(['forum' => 'API\ForumController']);
Route::post('comment', 'API\ForumController@storeComment');
Route::delete('comment/{id}', 'API\ForumController@deleteComment');

//City Routes
Route::apiResources(['city' => 'API\CityController']);
Route::post('city_officer', 'API\CityController@storeOfficer');
Route::get('city_officer', 'API\CityController@getOfficers');
Route::delete('city_officer/{id}', 'API\CityController@deleteOfficer');
Route::put('city_officer/{id}', 'API\CityController@updateOfficer');

//Event, News, Announcements Activities
Route::post('activity', 'API\ActivityController@store');
Route::get('event', 'API\ActivityController@getEvents');

//Baranggay Routes
Route::apiResources(['baranggay' => 'API\BaranggayController']);
