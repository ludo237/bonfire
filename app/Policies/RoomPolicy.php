<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Room;
use App\Models\User;

class RoomPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Room $room): bool
    {
        return $room->users()->where('users.id', $user->getKey())->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Room $room): bool
    {
        if ($room->isPublic()) {
            return $user->isAdmin();
        }

        return $room->getAttributeValue('owner_id') === $user->getKey();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Room $room): bool
    {
        if (! $room->isPublic()) {
            return false;
        }

        return $room->getAttributeValue('owner_id') === $user->getKey();
    }

    /**
     * Determine whether the user can add members to the room.
     */
    public function addMembers(User $user, Room $room): bool
    {
        if ($room->isPublic()) {
            return $user->isAdmin();
        }

        return $room->getAttributeValue('owner_id') === $user->getKey();
    }

    /**
     * Determine whether the user can remove members from the room.
     */
    public function removeMembers(User $user, Room $room): bool
    {
        if ($room->isPublic()) {
            return $user->isAdmin();
        }

        return $room->getAttributeValue('owner_id') === $user->getKey();
    }
}
