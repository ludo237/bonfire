<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Message $message,
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('room.'.$this->message->getAttributeValue('room_id')),
        ];
    }

    public function broadcastWith(): array
    {
        /** @var User $sender */
        $sender = $this->message->loadMissing('sender')->getRelationValue('sender');

        return [
            'id' => $this->message->getKey(),
            'roomId' => $this->message->getAttributeValue('room_id'),
            'clientMessageId' => $this->message->getAttributeValue('client_message_id'),
            'body' => $this->message->getAttributeValue('body'),
            'sender' => [
                'id' => $sender->getKey(),
                'name' => $sender->getAttributeValue('name'),
                'initials' => $sender->getAttributeValue('initials'),
            ],
            'createdAt' => $this->message->getAttributeValue('created_at'),
        ];
    }
}
