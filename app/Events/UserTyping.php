<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\Room;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserTyping implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public User $user,
        public Room $room,
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('room.'.$this->room->getKey().'.presence'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->user->getKey(),
            'name' => $this->user->getAttributeValue('name'),
            'initials' => $this->user->getAttributeValue('initials'),
        ];
    }
}
