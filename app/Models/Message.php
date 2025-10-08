<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Message extends Model
{
    use HasFactory, HasUlids;

    protected $guarded = ['id'];

    protected static function booted(): void
    {
        static::creating(function (Message $message) {
            if (empty($message->client_message_id)) {
                $message->client_message_id = (string) Str::uuid();
            }
        });

        static::created(function (Message $message) {
            $message->room->touch();

            RoomUser::query()
                ->where('room_id', $message->room_id)
                ->where('user_id', '!=', $message->sender_id)
                ->where('connections', 0)
                ->update([
                    'unread_at' => $message->created_at,
                    'updated_at' => now(),
                ]);
        });
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function boosts(): HasMany
    {
        return $this->hasMany(Boost::class);
    }

    #[Scope]
    public function ordered($query)
    {
        return $query->orderBy('created_at');
    }

    #[Scope]
    public function withCreator($query)
    {
        return $query->with('sender');
    }

    public function plainTextBody(): string
    {
        return strip_tags($this->body);
    }

    public function contentType(): string
    {
        if ($this->isSound()) {
            return 'sound';
        }

        return 'text';
    }

    public function isSound(): bool
    {
        return preg_match('/^\/play \w+$/', $this->plainTextBody()) === 1;
    }
}
