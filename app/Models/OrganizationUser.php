<?php

declare(strict_types=1);

namespace App\Models;

use App\MemberRole;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Ludo237\Traits\ExposeTableProperties;

class OrganizationUser extends Pivot
{
    use ExposeTableProperties;

    protected $table = 'organization_user';

    protected $casts = [
        'role' => MemberRole::class,
        'joined_at' => 'immutable_datetime',
    ];
}
