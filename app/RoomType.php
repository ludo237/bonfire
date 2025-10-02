<?php

declare(strict_types=1);

namespace App;

enum RoomType: string
{
    case PUBLIC = 'public';
    case PRIVATE = 'private';
    case DIRECT = 'direct';
}
