<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Http\Resources\OrganizationResource;
use App\Http\Resources\RoomResource;
use App\Http\Resources\UserResource;
use App\Models\Message;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Psr\SimpleCache\InvalidArgumentException;

class OrganizationController extends Controller
{
    /**
     * @throws InvalidArgumentException
     */
    public function show(Request $request, Organization $organization): Response
    {
        /** @var User $user */
        $user = $request->user();
        $organizationId = $request->session()->cache()->get('current_organization_id');

        $organization = Organization::query()
            ->whereKey($organizationId)
            ->whereHas('members', fn (Builder $q) => $q->whereKey($user->getKey()))
            ->withCount(['members', 'rooms'])
            ->firstOrFail();

        $latestMessages = Message::query()
            ->whereHas('room', fn (Builder $q) => $q->where('organization_id', $organization->getKey()))
            ->with(['sender', 'room'])
            ->latest()
            ->limit(10)
            ->get();

        $totalMessagesCount = Message::query()
            ->whereHas('room', fn (Builder $q) => $q->where('organization_id', $organization->getKey()))
            ->count();

        return Inertia::render('organizations/index', [
            'organization' => new OrganizationResource($organization),
            'latestMessages' => MessageResource::collection($latestMessages),
            'stats' => [
                'totalMessages' => $totalMessagesCount,
                'totalMembers' => $organization->getAttributeValue('members_count'),
                'totalRooms' => $organization->getAttributeValue('rooms_count'),
            ],
            'members' => Inertia::scroll(fn () => UserResource::collection(
                $organization
                    ->members()
                    ->paginate(perPage: 10, pageName: 'members')
                    ->withQueryString()
            )),
            'rooms' => Inertia::scroll(fn () => RoomResource::collection(
                $organization->rooms()
                    ->withCount(['messages', 'users'])
                    ->whereHas('users', fn (Builder $q) => $q->whereKey($user->getKey()))
                    ->latest()
                    ->paginate(perPage: 10, pageName: 'rooms')
                    ->withQueryString()
            )),
        ]);
    }
}
