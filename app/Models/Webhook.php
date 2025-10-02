<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Webhook extends Model
{
    use HasFactory, HasUlids;

    protected $guarded = ['id'];

    public function bot(): BelongsTo
    {
        return $this->belongsTo(User::class, 'bot_id');
    }
}
