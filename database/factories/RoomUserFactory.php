<?php

declare(strict_types=1);

namespace Database\Factories;

use App\InvolvementLevel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RoomUserFactory>
 */
class RoomUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => UserFactory::new()->lazy(),
            'room_id' => RoomFactory::new()->lazy(),
            'involvement' => $this->faker->randomElement(InvolvementLevel::cases()),
            'connections' => 0,
            'connected_at' => $this->faker->dateTime(),
            'unread_at' => null,
        ];
    }
}
