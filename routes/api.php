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

Route::post('/ussd', 'API\Process@index')->name('process');
Route::post('/user/logs', 'LogsController@logs')->name('logs');

Route::post('/datatables/roads','RoadsController@api');


