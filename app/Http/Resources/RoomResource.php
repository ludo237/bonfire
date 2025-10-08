<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Room */
class RoomResource extends JsonResource
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
            'slug' => $this->getAttributeValue('slug'),
            'name' => $this->getAttributeValue('name'),
            'type' => $this->getAttributeValue('type'),
            'owner' => new UserResource($this->whenLoaded('organization')),
            'lastMessage' => $this->when(
                $this->relationLoaded('messages') && $this->messages->isNotEmpty(),
                fn () => new MessageResource($this->messages->first())
            ),
            'users' => UserResource::collection($this->whenLoaded('users')),
            'counts' => [
                'messages' => $this->whenCounted(relationship: 'messages', default: 0),
                'users' => $this->whenCounted(relationship: 'users', default: 0),
            ],
            'createdAt' => $this->getAttributeValue('created_at'),
            'updatedAt' => $this->getAttributeValue('updated_at'),
        ];
    }
}
