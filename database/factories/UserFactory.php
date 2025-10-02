<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use App\UserRole;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'biography' => fake()->sentence(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => fake()->dateTimeThisYear(),
            'password' => static::$password ??= Hash::make('supersecret'),
            'remember_token' => Str::random(10),
            'role' => UserRole::MEMBER,
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'email' => 'foo@bar.com',
            'role' => UserRole::ADMIN,
        ]);
    }

    public function bot(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::BOT,
            'bot_token' => $token = Str::ulid(),
            'email' => "$token@bot-user.com",
        ]);
    }
}
