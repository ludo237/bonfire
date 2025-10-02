<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class MembershipController extends Controller
{
    public function store(Request $request, Room $room): RedirectResponse
    {
        Gate::authorize('addMembers', $room);

        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $user = User::query()->findOrFail($validated['user_id']);

        $room->grantAccessTo([$user]);

        return back();
    }

    public function destroy(Room $room, User $user): RedirectResponse
    {
        Gate::authorize('removeMembers', $room);

        $room->revokeAccessTo([$user]);

        return back();
    }

    public function update(Request $request, Room $room): RedirectResponse
    {
        $validated = $request->validate([
            'involvement' => ['required', 'in:all,mentions,none'],
        ]);

        $request->user()
            ->memberships()
            ->where('room_id', $room->getKey())
            ->update(['involvement' => $validated['involvement']]);

        return back();
    }
}
