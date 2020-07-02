<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::group(['prefix' => 'dashboard', 'middleware' => 'sendtologin'], function () {
    Route::get('/', 'Dashboard@index')->name('dashboard');
    Route::get('logs', 'LogsController@index')->name('logs');


    Route::group(['prefix' => 'screens'], function () {
        Route::get('/', 'DamageScreenController@index')->name('screens');
        Route::post('/update', 'DamageScreenController@update')->name('screens.update');

    });


    Route::group(['prefix' => 'roads'], function () {
        Route::get('/', 'RoadsController@general')->name('roads');

    });


    Route::group(['prefix' => 'regions'], function () {
        Route::get('/', 'RegionsController@index')->name('regions');
        Route::get('/{id}', 'RegionsController@states')->name('regions.single');
        Route::get('{id}/{state}', 'RoadsController@index')->name('regions.roads');
    });

    // route for adminstrator accounts

    Route::group(['prefix' => 'accounts'], function () {
        Route::get('/', 'Authentication@accounts')->name('accounts');
        Route::post('/info', 'Authentication@personal')->name('account.info.update');
        Route::post('password', 'Authentication@password')->name('account.password.update');
    });

    Route::group(['prefix' => 'entries'], function () {
        Route::get('/', 'DamageEntryController@index')->name('entries');
        Route::get('/{id}', 'DamageEntryController@show')->name('entries.show');
        Route::post('/{damageEntry}', 'DamageEntryController@update')->name('entries.update');
        Route::delete('/', 'DamageEntryController@destroy')->name('entries.clear');

    });
    Route::group(['prefix' => 'new'], function () {
        Route::get('/', 'RegisterController@index')->name('registration');
        Route::post('/register', 'RegisterController@create')->name('register.new');
    });
});

Route::group(['prefix' => 'auth'], function () {
    Route::group(['middleware' => 'sendtodash'], function () {
        Route::get('/login', 'Authentication@index')->name('login');
        Route::post('/login', 'Authentication@login')->name('signin');
    });
    Route::get('/logout', 'Authentication@logout')->name('logout');
});

Route::get('upload', 'UploadsController@index')->name('upload')->middleware('signed');
Route::post('upload', 'UploadsController@upload')->middleware('signed');



