<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Laravel\Fortify\Features;

describe('login screen', function () {
    it('can be rendered', function () {
        $this->get(route('login'))
            ->assertStatus(200);
    });
});

describe('authentication', function () {
    it('allows users to authenticate with valid credentials', function () {
        $user = User::factory()->create();

        $response = $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'supersecret',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('check-in.index', absolute: false));
    });

    it('redirects users with two factor to challenge', function () {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $user = User::factory()->create();

        $user->forceFill([
            'two_factor_secret' => encrypt('test-secret'),
            'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
            'two_factor_confirmed_at' => now(),
        ])->save();

        $response = $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'supersecret',
        ]);

        $response->assertRedirect(route('two-factor.login'));
        $response->assertSessionHas('login.id', $user->id);
        $this->assertGuest();
    });

    it('rejects authentication with invalid password', function () {
        $user = User::factory()->create();

        $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    });

    it('rate limits login attempts', function () {
        $user = User::factory()->create();

        RateLimiter::increment(implode('|', [$user->email, '127.0.0.1']), amount: 10);

        $response = $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors('email');

        $errors = session('errors');

        $this->assertStringContainsString('Too many login attempts', $errors->first('email'));
    });
});

describe('logout', function () {
    it('allows users to logout', function () {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('logout'));

        $this->assertGuest();
        $response->assertRedirect(route('home'));
    });
});
