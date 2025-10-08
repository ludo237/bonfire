<?php

declare(strict_types=1);

namespace App\Models;

use App\InvolvementLevel;
use App\RoomType;
use Database\Factories\RoomFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Room extends Model
{
    /** @use HasFactory<RoomFactory> */
    use HasFactory, HasUlids;

    protected $guarded = ['id'];

    protected $casts = [
        'type' => RoomType::class,
    ];

    public function isPublic(): bool
    {
        return $this->getAttributeValue('type') === RoomType::PUBLIC;
    }

    public function isPrivate(): bool
    {
        return $this->getAttributeValue('type') === RoomType::PRIVATE;
    }

    public function isDirect(): bool
    {
        return $this->getAttributeValue('type') === RoomType::DIRECT;
    }

    public function users(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                related: User::class,
                table: 'room_user'
            )
            ->withPivot(['unread_at', 'involvement', 'connections', 'connected_at'])
            ->withTimestamps();
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'room_id');
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    #[Scope]
    public function public($query)
    {
        return $query->where('type', RoomType::PUBLIC);
    }

    #[Scope]
    public function private($query)
    {
        return $query->where('type', RoomType::PRIVATE);
    }

    #[Scope]
    public function direct($query)
    {
        return $query->where('type', RoomType::DIRECT);
    }

    /**
     * @param  Collection<User>  $users
     */
    public function grantAccessTo(Collection $users): void
    {
        $data = $users->map(fn (User $user) => [
            'room_id' => $this->getKey(),
            'user_id' => $user->getKey(),
            'involvement' => $this->defaultInvolvement(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        RoomUser::query()->insertOrIgnore($data->all());
    }

    /**
     * @param  User[]  $users
     */
    public function revokeAccessTo(array $users): void
    {
        $userIds = collect($users)->map(fn (User $user) => $user->getKey());

        $this->users()->whereIn('user_id', $userIds)->delete();
    }

    public function defaultInvolvement(): string
    {
        return InvolvementLevel::MENTIONS->value;
    }
}
