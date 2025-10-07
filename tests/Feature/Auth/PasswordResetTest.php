<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;

describe('reset password link screen', function () {
    it('can be rendered', function () {
        $this->get(route('password.request'))
            ->assertStatus(200);
    });
});

describe('reset password link request', function () {
    it('can be requested', function () {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route('password.email'), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class);
    });
});

describe('reset password screen', function () {
    it('can be rendered', function () {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route('password.email'), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
            $this->get(route('password.reset', $notification->token))
                ->assertStatus(200);

            return true;
        });
    });
});

describe('password reset', function () {
    it('allows reset with valid token', function () {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route('password.email'), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $this->post(route('password.store'), [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
            ])
                ->assertSessionHasNoErrors()
                ->assertRedirect(route('login'));

            return true;
        });
    });

    it('rejects reset with invalid token', function () {
        $user = User::factory()->create();

        $this->post(route('password.store'), [
            'token' => 'invalid-token',
            'email' => $user->email,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ])
            ->assertSessionHasErrors('email');
    });
});
