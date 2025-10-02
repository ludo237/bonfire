<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Membership;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Membership>
 */
class MembershipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'room_id' => Room::factory(),
            'unread_at' => null,
            'involvement' => 'mentions',
            'connections' => 0,
            'connected_at' => null,
        ];
    }
}
