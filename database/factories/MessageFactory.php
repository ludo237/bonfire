<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_id' => Room::factory(),
            'creator_id' => User::factory(),
            'client_message_id' => Str::uuid(),
            'body' => '<p>'.$this->faker->paragraph().'</p>',
        ];
    }
}
