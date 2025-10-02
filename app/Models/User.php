<?php

declare(strict_types=1);

namespace App\Models;

use App\UserRole;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;
use Throwable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUlids, Notifiable, SoftDeletes, TwoFactorAuthenticatable;

    protected $guarded = ['id'];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'bot_token',
    ];

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function rooms(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                related: Room::class,
                table: 'memberships'
            )
            ->using(Membership::class)
            ->withPivot(['unread_at', 'involvement', 'connections', 'connected_at'])
            ->withTimestamps();
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function boosts(): HasMany
    {
        return $this->hasMany(Boost::class, 'booster_id');
    }

    public function pushSubscriptions(): HasMany
    {
        return $this->hasMany(PushSubscription::class);
    }

    public function searches(): HasMany
    {
        return $this->hasMany(Search::class);
    }

    public function webhooks(): HasMany
    {
        return $this->hasMany(Webhook::class, 'bot_id');
    }

    #[Scope]
    public function ordered($query)
    {
        return $query->orderByRaw('LOWER(name)');
    }

    #[Scope]
    public function bots($query)
    {
        return $query->whereNotNull('bot_token');
    }

    public function getInitialsAttribute(): string
    {
        return collect(explode(' ', $this->name))
            ->map(fn ($word) => mb_strtoupper($word[0] ?? ''))
            ->join('');
    }

    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN;
    }

    public function isBot(): bool
    {
        return ! empty($this->getAttributeValue('bot_token'));
    }

    /**
     * @throws Throwable
     */
    public function deactivate(): void
    {
        DB::transaction(function () {
            $this->memberships()
                ->whereHas('room', fn (Builder $q) => $q->direct())
                ->delete();

            $this->pushSubscriptions()->delete();
            $this->searches()->delete();

            $this->update([
                'email' => str_replace('@', "-deactivated-{$this->getKey()}@", $this->getAttributeValue('email')),
            ]);

            $this->delete();
        });
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'two_factor_confirmed_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }
}
