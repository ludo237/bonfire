<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\MessageBoosted;
use App\Http\Controllers\Controller;
use App\Http\Resources\BoostResource;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BoostController extends Controller
{
    public function store(Request $request, Message $message): JsonResponse
    {
        if (! $message->room->users()->where('users.id', $request->user()->getKey())->exists()) {
            abort(403, 'You do not have access to this room.');
        }

        $boost = $message->boosts()->firstOrCreate([
            'booster_id' => $request->user()->getKey(),
        ]);

        $boost->load('booster');

        if ($boost->wasRecentlyCreated) {
            MessageBoosted::dispatch($boost);
        }

        return (new BoostResource($boost))
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(Request $request, Message $message): JsonResponse
    {
        if (! $message->room->users()->where('users.id', $request->user()->getKey())->exists()) {
            abort(403, 'You do not have access to this room.');
        }

        $message->boosts()->where('booster_id', $request->user()->getKey())->delete();

        return response()->json(['success' => true]);
    }
}
