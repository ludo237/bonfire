<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Collection;

class AddUsersToRoomsAction
{
    /**
     * @param  Collection<Room>  $rooms
     * @param  Collection<User>  $users
     */
    public function handle(Collection $rooms, Collection $users): void
    {
        $rooms->each(fn (Room $room) => $room->grantAccessTo($users));
    }
}
