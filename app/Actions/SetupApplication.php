<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Room;
use App\Models\User;
use App\RoomType;
use App\UserType;
use Illuminate\Support\Facades\DB;
use Throwable;

class SetupApplication
{
    public const FIRST_ROOM_NAME = 'All Talk';

    public function __construct(
        private readonly CreateUser $createUser,
    ) {}

    /**
     * Set up the application with the first admin user and default room.
     *
     * @param  array<string, mixed>  $userData
     *
     * @throws Throwable
     */
    public function handle(array $userData): User
    {
        return DB::transaction(function () use ($userData) {
            $admin = $this->createUser->handle($userData, UserType::ADMIN);

            $room = Room::query()->create([
                'name' => self::FIRST_ROOM_NAME,
                'type' => RoomType::PUBLIC,
                'owner_id' => $admin->getKey(),
            ]);

            $room->grantAccessTo([$admin]);

            return $admin;
        });
    }
}
