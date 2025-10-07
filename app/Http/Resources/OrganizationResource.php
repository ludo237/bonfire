<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Organization */
class OrganizationResource extends JsonResource
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
            'name' => $this->getAttributeValue('name'),
            'rooms' => RoomResource::collection($this->whenLoaded('rooms')),
            'counts' => [
                'members' => $this->whenCounted(
                    relationship: 'members',
                    default: 0
                ),
                'rooms' => $this->whenCounted(
                    relationship: 'rooms',
                    default: 0
                ),
            ],
        ];
    }
}
