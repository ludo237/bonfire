<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->organization = Organization::factory()->create();
    $this->organization->members()->attach($this->user);

    session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));
});

describe('profile page', function () {
    it('can be displayed', function () {
        $this->actingAs($this->user)
            ->get(route('profile.edit'))
            ->assertOk();
    });
});

describe('profile update', function () {
    it('allows updating profile information', function () {
        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        $this->user->refresh();

        expect($this->user->name)->toBe('Test User');
        expect($this->user->email)->toBe('test@example.com');
        expect($this->user->email_verified_at)->toBeNull();
    });

    it('preserves verification status when email is unchanged', function () {
        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => 'Test User',
                'email' => $this->user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        expect($this->user->refresh()->email_verified_at)->not->toBeNull();
    });
});

describe('account deletion', function () {
    it('allows user to delete their account', function () {
        $user = $this->user;

        $response = $this
            ->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'supersecret',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('home'));

        $this->assertGuest();
        expect($user->fresh()->trashed())->toBeTrue();
    });

    it('requires correct password to delete account', function () {
        $response = $this
            ->actingAs($this->user)
            ->from(route('profile.edit'))
            ->delete(route('profile.destroy'), [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect(route('profile.edit'));

        expect($this->user->fresh())->not->toBeNull();
    });
});
