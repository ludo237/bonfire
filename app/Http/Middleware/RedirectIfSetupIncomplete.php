<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Account;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfSetupIncomplete
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Account::query()->doesntExist() && ! $request->routeIs('first-run.*')) {
            return redirect()->route('first-run.show');
        }

        return $next($request);
    }
}
