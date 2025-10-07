<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    $this->organization = Organization::factory()->create();
});

describe('verification notification', function () {
    it('sends notification to unverified users', function () {
        Notification::fake();

        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        $this->actingAs($user)
            ->from(route('home'))
            ->post(route('verification.send'))
            ->assertRedirect(route('home'));

        Notification::assertSentTo($user, VerifyEmail::class);
    });

    it('does not send notification if email is verified', function () {
        Notification::fake();

        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);
        $this->organization->members()->attach($user);
        session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));

        $this->actingAs($user)
            ->post(route('verification.send'))
            ->assertRedirect(route('check-in.index', absolute: false));

        Notification::assertNothingSent();
    });
});
