<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\MediaFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ludo237\Traits\ExposeTableProperties;

class Media extends Model
{
    /** @use HasFactory<MediaFactory> */
    use ExposeTableProperties, HasFactory, HasUlids;

    protected $guarded = ['id'];
}
