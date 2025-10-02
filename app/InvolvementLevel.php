<?php

declare(strict_types=1);

namespace App;

enum InvolvementLevel: string
{
    case ALL = 'all';
    case MENTIONS = 'mentions';
    case NONE = 'none';
}
