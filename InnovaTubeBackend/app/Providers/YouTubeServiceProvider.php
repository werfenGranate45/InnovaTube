<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Google_Client;
use App\Services\YouTubeService;

class YouTubeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        $this->app->singleton(YouTubeService::class, function(){
            return new YouTubeService(new Google_Client());
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
