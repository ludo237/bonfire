<?php

declare(strict_types=1);

use App\Models\User;

use function Pest\Laravel\actingAs;

describe('home page', function () {
    it('renders home component when authenticated', function () {
        $user = User::factory()->create();

        actingAs($user)
            ->get(route('home'))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page->component('home'));
    });

    it('is accessible to guests', function () {
        $this->get(route('home'))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page->component('home'));
    });
});
