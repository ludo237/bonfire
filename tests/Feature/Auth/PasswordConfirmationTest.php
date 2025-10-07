<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

describe('confirm password screen', function () {
    it('can be rendered', function () {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('password.confirm'))
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/confirm-password')
            );
    });

    it('requires authentication', function () {
        $this->get(route('password.confirm'))
            ->assertRedirect(route('login'));
    });
});
