<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/** @mixin Media */
class MediaResource extends JsonResource
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
            'extension' => $this->getAttributeValue('extension'),
            'originalName' => $this->getAttributeValue('original_name'),
            'mimeType' => $this->getAttributeValue('mime_type'),
            'width' => $this->getAttributeValue('width'),
            'height' => $this->getAttributeValue('height'),
            'size' => $this->getAttributeValue('size'),
            'duration' => $this->getAttributeValue('duration'),
            'url' => Storage::disk('avatars')->url($this->getAttributeValue('name').'.'.$this->getAttributeValue('extension')),
            'createdAt' => $this->getAttributeValue('created_at'),
            'updatedAt' => $this->getAttributeValue('updated_at'),
        ];
    }
}
