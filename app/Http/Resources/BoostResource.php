<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Boost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Boost */
class BoostResource extends JsonResource
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
            'sender' => new UserResource($this->whenLoaded('booster')),
            'message' => new MessageResource($this->whenLoaded('message')),
            'createdAt' => $this->getAttributeValue('created_at'),
            'updatedAt' => $this->getAttributeValue('updated_at'),
        ];
    }
}
