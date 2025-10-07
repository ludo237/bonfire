<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->organization = Organization::factory()->create();
    $this->organization->members()->attach($this->user);

    session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));
});

describe('password update page', function () {
    it('can be displayed', function () {
        $this->actingAs($this->user)
            ->get(route('password.edit'))
            ->assertStatus(200);
    });
});

describe('password update', function () {
    it('allows updating password', function () {
        $user = $this->user;

        $response = $this
            ->actingAs($user)
            ->from(route('password.edit'))
            ->put(route('password.update'), [
                'current_password' => 'supersecret',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('password.edit'));

        expect(Hash::check('new-password', $user->fresh()->password))->toBeTrue();
    });

    it('requires correct current password', function () {
        $response = $this
            ->actingAs($this->user)
            ->from(route('password.edit'))
            ->put(route('password.update'), [
                'current_password' => 'wrong-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response
            ->assertSessionHasErrors('current_password')
            ->assertRedirect(route('password.edit'));
    });
});
