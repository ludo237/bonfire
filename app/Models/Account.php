<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Stub model for Account.
 *
 * Currently acts as a marker for "has the app been set up?"
 * In the future, this will support multi-tenancy.
 *
 * For now, we simply check if any users exist to determine setup status.
 */
class Account extends Model
{
    public static function exists(): bool
    {
        return User::query()->exists();
    }
}
