<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Message */
class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'clientMessageId' => $this->getAttributeValue('client_message_id'),
            'body' => $this->getAttributeValue('body'),
            'sender' => new UserResource($this->whenLoaded('sender')),
            'room' => new RoomResource($this->whenLoaded('room')),
            'boosts' => BoostResource::collection($this->whenLoaded('boosts')),
            'counts' => [
                'boosts' => $this->whenCounted(relationship: 'boosts', default: 0),
            ],
            'createdAt' => $this->getAttributeValue('created_at'),
            'updatedAt' => $this->getAttributeValue('updated_at'),
        ];
    }
}
