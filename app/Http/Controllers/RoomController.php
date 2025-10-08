<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Http\Resources\RoomResource;
use App\Models\Organization;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        // Get current organization from session cache
        $organizationId = $request->session()->cache()->get('current_organization_id');

        $rooms = Room::query()
            ->where('organization_id', $organizationId)
            ->with('organization')
            ->withCount(['messages'])
            ->whereHas('users', fn (Builder $q) => $q->whereKey($user->getKey()))
            ->latest()
            ->get();

        return Inertia::render('rooms/index', [
            'rooms' => RoomResource::collection($rooms),
        ]);
    }

    public function show(Request $request, Organization $organization, Room $room): Response
    {
        Gate::authorize('view', $room);

        $room->loadMissing(['organization', 'owner', 'users.avatar']);

        return Inertia::render('rooms/show', [
            'room' => new RoomResource($room),
            'messages' => Inertia::scroll(
                fn () => MessageResource::collection(
                    $room->messages()
                        ->with(['sender.avatar'])
                        ->oldest()
                        ->cursorPaginate(50)
                )
            ),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Room::class);

        return Inertia::render('rooms/create');
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Room::class);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:public,private'],
        ]);

        // Get current organization from session cache
        $organizationId = $request->session()->cache()->get('current_organization_id');

        /** @var Room $room */
        $room = Room::query()->create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'owner_id' => $request->user()->getKey(),
            'organization_id' => $organizationId,
        ]);

        $room->grantAccessTo([$request->user()]);

        return redirect()->route('rooms.show', $room);
    }

    public function edit(Room $room): Response
    {
        Gate::authorize('update', $room);

        return Inertia::render('rooms/edit', [
            'room' => new RoomResource($room),
        ]);
    }

    public function update(Request $request, Room $room): RedirectResponse
    {
        Gate::authorize('update', $room);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $room->update($validated);

        return redirect()->route('rooms.show', $room);
    }

    public function destroy(Room $room): RedirectResponse
    {
        Gate::authorize('delete', $room);

        $room->delete();

        return redirect()->route('rooms.index');
    }
}
