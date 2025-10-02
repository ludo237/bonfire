<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\Boost;
use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageBoosted implements ShouldBroadcast, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Boost $boost,
    ) {
        $this->boost->loadMissing('booster');
    }

    public function broadcastOn(): array
    {
        /** @var Message $message */
        $message = $this->boost->loadMissing('message')->getRelationValue('message');

        return [
            new PrivateChannel('room.'.$message->getAttributeValue('room_id')),
        ];
    }

    public function broadcastWith(): array
    {
        /** @var User $booster */
        $booster = $this->boost->getRelationValue('booster');

        return [
            'id' => $this->boost->getKey(),
            'messageId' => $this->boost->getAttributeValue('message_id'),
            'booster' => [
                'id' => $booster->getKey(),
                'name' => $booster->getAttributeValue('name'),
                'initials' => $booster->getAttributeValue('initials'),
            ],
            'createdAt' => $this->boost->getAttributeValue('created_at'),
        ];
    }
}
