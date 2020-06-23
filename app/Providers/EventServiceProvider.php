<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\View;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('layouts.dashboard', function ($view) {
            $view->with([
                'logs'=> \App\Log::orderBy('id','desc')->get(),
                'regions' => \App\GeoRegions::with('states')->get()->take(5),
                'reports'=> \App\DamageEntry::with('roads')->get()
            ]);
        });
        parent::boot();

        //
    }
}
