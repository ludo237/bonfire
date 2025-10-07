<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;

beforeEach(function () {
    $this->organization = Organization::factory()->create();
});

describe('email verification screen', function () {
    it('can be rendered', function () {
        $user = User::factory()->unverified()->create();
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        $this->actingAs($user)
            ->get(route('verification.notice'))
            ->assertStatus(200);
    });

    it('redirects verified users to check-in', function () {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        $this->actingAs($user)
            ->get(route('verification.notice'))
            ->assertRedirect(route('check-in.index', absolute: false));
    });
});

describe('email verification', function () {
    it('verifies email with valid link', function () {
        $user = User::factory()->unverified()->create();
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->actingAs($user)->get($verificationUrl);

        Event::assertDispatched(Verified::class);
        expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
        $response->assertRedirect(route('check-in.index', absolute: false).'?verified=1');
    });

    it('does not verify email with invalid hash', function () {
        $user = User::factory()->unverified()->create();
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1('wrong-email')]
        );

        $this->actingAs($user)->get($verificationUrl);

        expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
    });

    it('does not verify email with invalid user id', function () {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => 123, 'hash' => sha1($user->email)]
        );

        $this->actingAs($user)->get($verificationUrl);

        expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
    });

    it('redirects already verified users without firing event', function () {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $this->actingAs($user)
            ->get($verificationUrl)
            ->assertRedirect(route('check-in.index', absolute: false).'?verified=1');

        expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
        Event::assertNotDispatched(Verified::class);
    });
});
