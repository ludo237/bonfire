<?php

declare(strict_types=1);

namespace App\Models;

use App\InvolvementLevel;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Membership extends Pivot
{
    use HasFactory;

    protected $table = 'memberships';

    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    #[Scope]
    public function visible($query)
    {
        return $query->where(function ($q) {
            $q->where('involvement', '!=', InvolvementLevel::NONE->value)
                ->orWhereNotNull('unread_at');
        });
    }

    #[Scope]
    public function disconnected($query)
    {
        return $query->where('connections', 0);
    }

    #[Scope]
    public function connected($query)
    {
        return $query->where('connections', '>', 0);
    }

    protected function casts(): array
    {
        return [
            'unread_at' => 'datetime',
            'connected_at' => 'datetime',
            'involvement' => InvolvementLevel::class,
        ];
    }
}
