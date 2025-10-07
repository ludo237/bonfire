<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationResource;
use App\Http\Resources\RoomResource;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function show(Request $request, Organization $organization): Response
    {
        /** @var User $user */
        $user = $request->user();

        // Get current organization from session cache
        $organizationId = $request->session()->cache()->get('current_organization_id');

        // Load organization with rooms
        $organization = Organization::query()
            ->whereKey($organizationId)
            ->whereHas('members', fn (Builder $q) => $q->whereKey($user->getKey()))
            ->with(['rooms' => function ($query) use ($user) {
                $query->withCount(['messages'])
                    ->whereHas('users', fn (Builder $q) => $q->whereKey($user->getKey()))
                    ->latest();
            }])
            ->firstOrFail();

        return Inertia::render('organizations/index', [
            'organization' => new OrganizationResource($organization),
            'rooms' => RoomResource::collection($organization->rooms),
        ]);
    }
}
