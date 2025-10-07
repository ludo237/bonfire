<?php

declare(strict_types=1);

use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('room.{roomId}', function (User $user, string $roomId) {
    /** @var Room|null $room */
    $room = Room::query()->find($roomId);

    if (! $room) {
        return false;
    }

    return $room->users()->where('users.id', $user->getKey())->exists();
});

Broadcast::channel('room.{roomId}.presence', function (User $user, string $roomId) {
    $room = Room::query()->find($roomId);

    if (! $room || ! $room->users()->where('users.id', $user->getKey())->exists()) {
        return null;
    }

    return [
        'id' => $user->getKey(),
        'name' => $user->getAttributeValue('name'),
    ];
});
