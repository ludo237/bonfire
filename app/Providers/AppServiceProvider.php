<?php

declare(strict_types=1);

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        URL::forceHttps($this->app->environment(['production', 'prod']));

        Date::use(CarbonImmutable::class);

        Vite::useAggressivePrefetching();
        Vite::prefetch();
    }
}
