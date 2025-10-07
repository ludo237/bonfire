<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\OrganizationFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ludo237\Traits\ExposeTableProperties;

class Organization extends Model
{
    /** @use HasFactory<OrganizationFactory> */
    use ExposeTableProperties, HasFactory, HasUlids;

    protected $guarded = ['id'];

    public function members(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                related: User::class,
                table: 'organization_user'
            )
            ->using(OrganizationUser::class)
            ->withPivot(['role', 'joined_at']);
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }
}
