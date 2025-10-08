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

class OrganizationController extends Controller
{
    public function show(Request $request, Organization $organization): Response
    {
        /** @var User $user */
        $user = $request->user();

        $organization->loadCount(['members', 'rooms', 'messages']);

        $latestMessages = Message::query()
            ->whereHas('room', fn (Builder $q) => $q->where('organization_id', $organization->getKey()))
            ->with(['sender', 'room'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('organizations/index', [
            'organization' => new OrganizationResource($organization),
            'latestMessages' => MessageResource::collection($latestMessages),
            'stats' => [
                'totalMessages' => $organization->getAttributeValue('messages_count'),
                'totalMembers' => $organization->getAttributeValue('members_count'),
                'totalRooms' => $organization->getAttributeValue('rooms_count'),
            ],
            'members' => UserResource::collection(
                $organization
                    ->members()
                    ->withPivot(['role', 'joined_at'])
                    ->withCount([
                        'messages' => fn (Builder $q) => $q->whereHas('room', fn (Builder $q) => $q->where('organization_id', $organization->getKey())),
                    ])
                    ->paginate(perPage: 10, pageName: 'members')
                    ->withQueryString()
            ),
            'rooms' => RoomResource::collection(
                $organization->rooms()
                    ->withCount(['messages', 'users'])
                    ->with(['messages' => fn ($q) => $q->with('sender')->latest()->limit(1)])
                    ->whereHas('users', fn (Builder $q) => $q->whereKey($user->getKey()))
                    ->latest()
                    ->paginate(perPage: 10, pageName: 'rooms')
                    ->withQueryString()
            ),
        ]);
    }
}
