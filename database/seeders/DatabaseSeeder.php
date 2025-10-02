<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Actions\AttachUserToPublicRooms;
use Database\Factories\RoomFactory;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function __construct(
        private readonly AttachUserToPublicRooms $attachUserToPublicRooms,
    ) {}

    public function run(): void
    {
        // Create admin user
        $admin = UserFactory::new()
            ->admin()
            ->create();

        // Create rooms owned by admin (mix of public and private)
        $adminRooms = RoomFactory::new()
            ->for($admin, 'owner')
            ->count(5)
            ->create();

        // Attach admin to all rooms they created
        $admin->rooms()->attach($adminRooms);

        // Create regular users
        $users = UserFactory::new()
            ->count(30)
            ->create();

        // Explicitly attach each user to public rooms and all admin's rooms
        foreach ($users as $user) {
            // Attach to all admin rooms
            $user->rooms()->attach($adminRooms);

            // Also attach to any other public rooms that might exist
            $this->attachUserToPublicRooms->handle($user);
        }

        // Create unverified users (don't attach to any rooms)
        UserFactory::new()
            ->count(10)
            ->unverified()
            ->create();

        // Create soft-deleted users (don't attach to any rooms)
        UserFactory::new()
            ->trashed()
            ->count(5)
            ->create();

        // Create bot users
        UserFactory::new()
            ->count(2)
            ->bot()
            ->create();
    }
}
