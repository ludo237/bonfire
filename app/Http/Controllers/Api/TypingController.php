<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\UserTyping;
use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TypingController extends Controller
{
    public function store(Request $request, Room $room): JsonResponse
    {
        if (! $room->users()->where('users.id', $request->user()->getKey())->exists()) {
            abort(403, 'You do not have access to this room.');
        }

        broadcast(new UserTyping($request->user(), $room))->toOthers();

        return response()->json(['success' => true]);
    }
}
