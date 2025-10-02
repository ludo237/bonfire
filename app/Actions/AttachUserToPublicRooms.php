<?php

declare(strict_types=1);

namespace App\Actions;

use App\InvolvementLevel;
use App\Models\Membership;
use App\Models\Room;
use App\Models\User;

class AttachUserToPublicRooms
{
    /**
     * Attach the user to all public rooms.
     */
    public function handle(User $user): void
    {
        $publicRoomIds = Room::query()->public()->pluck('id');

        if ($publicRoomIds->isEmpty()) {
            return;
        }

        $data = $publicRoomIds->map(fn ($roomId) => [
            'room_id' => $roomId,
            'user_id' => $user->getKey(),
            'involvement' => InvolvementLevel::MENTIONS->value,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Membership::query()->insertOrIgnore($data->all());
    }
}
