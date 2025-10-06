<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\InvolvementLevel;
use App\MemberRole;
use Database\Factories\OrganizationFactory;
use Database\Factories\RoomFactory;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function __construct() {}

    public function run(): void
    {
        $admin = UserFactory::new()
            ->admin()
            ->create();

        $org = OrganizationFactory::new()
            ->hasAttached(
                factory: $admin,
                pivot: [
                    'role' => MemberRole::ADMIN,
                ],
                relationship: 'members'
            )->create();

        $users = UserFactory::new()
            ->count(30)
            ->hasAttached(
                factory: $org,
                pivot: [
                    'role' => MemberRole::MEMBER,
                ],
                relationship: 'organizations'
            )
            ->create();

        RoomFactory::new()
            ->for($org, 'organization')
            ->hasAttached(
                factory: $users,
                pivot: [
                    'involvement' => InvolvementLevel::ALL,
                ],
                relationship: 'users')
            ->hasAttached(
                factory: $admin,
                pivot: [
                    'involvement' => InvolvementLevel::MENTIONS,
                ],
                relationship: 'users')
            ->count(5)
            ->create();
    }
}
