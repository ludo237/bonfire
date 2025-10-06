<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Room;
use App\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => $this->faker->slug(),
            'name' => $this->faker->words(2, true),
            'type' => $this->faker->randomElement([RoomType::PRIVATE, RoomType::PUBLIC]),
            'organization_id' => OrganizationFactory::new()->lazy(),
        ];
    }

    public function public(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => RoomType::PUBLIC,
        ]);
    }

    public function private(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => RoomType::PRIVATE,
        ]);
    }

    public function direct(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => RoomType::DIRECT,
            'name' => null,
        ]);
    }
}
