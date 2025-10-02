<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Message;
use App\Models\User;

class MessagePolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Message $message): bool
    {
        return $message->room->users()->where('users.id', $user->getKey())->exists();
    }

    /**
     * Determine whether the user can create messages in a room.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Message $message): bool
    {
        return $message->creator_id === $user->getKey();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Message $message): bool
    {
        return $message->creator_id === $user->getKey() || $user->isAdmin();
    }
}
