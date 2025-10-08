<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Http\Resources\OrganizationResource;
use App\Http\Resources\UserResource;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        /** @var User|null $user */
        $user = $request->user()?->load('avatar');
        $currentOrganization = null;

        if ($user) {
            // Get current organization from session cache
            $organizationId = $request->session()->cache()->get('current_organization_id');

            if ($organizationId) {
                $currentOrganization = Organization::query()
                    ->whereKey($organizationId)
                    ->whereHas('members', fn (Builder $query) => $query->whereKey($user->getKey()))
                    ->with(['rooms' => function ($query) use ($user) {
                        $query->select(['id', 'name', 'slug', 'type', 'organization_id'])
                            ->whereHas('users', fn (Builder $q) => $q->whereKey($user->getKey()))
                            ->withCount(['messages', 'users'])
                            ->latest();
                    }])
                    ->first();

                $currentOrganization = new OrganizationResource($currentOrganization);
            }

            $user = new UserResource($user);
        }

        return [
            ...parent::share($request),
            'csrf' => csrf_token(),
            'auth' => [
                'user' => $user,
                'currentOrganization' => $currentOrganization,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
