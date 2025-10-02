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
            'bio' => $this->getAttributeValue('biography'),
            'email' => $this->getAttributeValue('email'),
            'role' => $this->getAttributeValue('role'),
            'emailVerifiedAt' => $this->getAttributeValue('email_verified_at'),
            'initials' => $this->getAttributeValue('initials'),
            'createdAt' => $this->getAttributeValue('created_at'),
            'updatedAt' => $this->getAttributeValue('updated_at'),
            'deletedAt' => $this->getAttributeValue('deleted_at'),
        ];
    }
}
