<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
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

        $rooms = Room::query()
            ->with('organization')
            ->withCount(['messages'])
            ->whereHas('users', fn (Builder $q) => $q->whereKey($user->getKey()))
            ->latest()
            ->get();

        return Inertia::render('rooms/index', [
            'rooms' => RoomResource::collection($rooms),
        ]);
    }

    public function show(Request $request, Room $room): Response
    {
        Gate::authorize('view', $room);

        $room->loadMissing(['organization', 'users', 'messages.sender']);

        return Inertia::render('rooms/show', [
            'room' => new RoomResource($room),
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

        /** @var Room $room */
        $room = Room::query()->create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'owner_id' => $request->user()->getKey(),
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
