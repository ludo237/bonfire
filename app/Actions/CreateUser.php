<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\User;
use App\UserRole;

class CreateUser
{
    /**
     * Create a new user with the given data.
     *
     * @param  array<string, mixed>  $data
     */
    public function handle(array $data, UserRole $role = UserRole::MEMBER): User
    {
        return User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $role,
            'bio' => $data['bio'] ?? null,
            'bot_token' => $data['bot_token'] ?? null,
        ]);
    }
}
