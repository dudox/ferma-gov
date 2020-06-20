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
    Route::group(['prefix' => 'screens'], function () {
        Route::get('/', 'DamageScreenController@index')->name('screens');
        Route::post('/update', 'DamageScreenController@update')->name('screens.update');

    });
    Route::group(['prefix' => 'entries'], function () {
        Route::get('/', 'DamageEntryController@index')->name('entries');
        Route::get('/{damageEntry}', 'DamageEntryController@show')->name('entries.show');
        Route::post('/{damageEntry}', 'DamageEntryController@update')->name('entries.update');
        Route::delete('/', 'DamageEntryController@destroy')->name('entries.clear');

    });
});

Route::group(['prefix' => 'auth'], function () {
    Route::group(['middleware' => 'sendtodash'], function () {
        Route::get('/login', 'Authentication@index')->name('login');
        Route::post('/login', 'Authentication@login')->name('signin');
    });
    Route::get('/logout', 'Authentication@logout')->name('logout');
});

Route::get('logs', 'LogsController@index');