<?php

declare(strict_types=1);

use App\Http\Middleware\EnsureOrganizationSelected;
use App\Http\Middleware\EnsureUserIsActive;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up'
    )
    ->withBroadcasting(
        channels: __DIR__.'/../routes/channels.php',
        attributes: ['middleware' => ['web', 'auth']],
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware
            ->encryptCookies(except: ['appearance', 'sidebar_state'])
            ->redirectUsersTo(fn (Request $request) => route('check-in.index'))
            ->web(append: [
                HandleAppearance::class,
                HandleInertiaRequests::class,
                AddLinkHeadersForPreloadedAssets::class,
            ])
            ->alias([
                'active' => EnsureUserIsActive::class,
                'organization.selected' => EnsureOrganizationSelected::class,
            ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {})
    ->create();
