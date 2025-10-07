<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOrganizationSelected
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if organization is selected in session cache
        $organizationId = $request->session()->cache()->get('current_organization_id');

        if (! $organizationId) {
            return redirect()->route('check-in.index');
        }

        return $next($request);
    }
}
