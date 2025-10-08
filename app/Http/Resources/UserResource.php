<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
class UserResource extends JsonResource
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
            'biography' => $this->getAttributeValue('biography'),
            'email' => $this->getAttributeValue('email'),
            'emailVerifiedAt' => $this->getAttributeValue('email_verified_at'),
            'initials' => $this->getAttributeValue('initials'),
            'avatar' => new MediaResource($this->whenLoaded('avatar')),
            'role' => $this->whenPivotLoaded('organization_user', fn () => $this->pivot->role),
            'joinedAt' => $this->whenPivotLoaded('organization_user', fn () => $this->pivot->joined_at),
            'messagesCount' => $this->whenCounted('messages'),
            'createdAt' => $this->getAttributeValue('created_at'),
            'updatedAt' => $this->getAttributeValue('updated_at'),
            'deletedAt' => $this->getAttributeValue('deleted_at'),
        ];
    }
}
