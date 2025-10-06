<?php

declare(strict_types=1);

namespace App;

enum MemberRole: string
{
    case ADMIN = 'admin';
    case MEMBER = 'member';
}
