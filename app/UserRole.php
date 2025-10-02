<?php

declare(strict_types=1);

namespace App;

enum UserRole: string
{
    case ADMIN = 'admin';
    case MEMBER = 'member';
    case BOT = 'bot';
}
