<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request, Room $room): JsonResponse
    {
        if (! $room->users()->where('users.id', $request->user()->id)->exists()) {
            abort(403, 'You do not have access to this room.');
        }

        $validated = $request->validate([
            'body' => ['required', 'string'],
            'client_message_id' => ['nullable', 'uuid', 'unique:messages'],
        ]);

        $message = $room->messages()->create([
            'sender_id' => $request->user()->id,
            'body' => $validated['body'],
            'client_message_id' => $validated['client_message_id'] ?? null,
        ]);

        $message->load('sender');

        broadcast(new MessageSent($message))->toOthers();

        return (new MessageResource($message))
            ->response()
            ->setStatusCode(201);
    }
}
