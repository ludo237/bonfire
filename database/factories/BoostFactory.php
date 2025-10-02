<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Boost;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Boost>
 */
class BoostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message_id' => Message::factory(),
            'booster_id' => User::factory(),
            'content' => fake()->randomElement(['👍', '❤️', '😂']),
        ];
    }
}
