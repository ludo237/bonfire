<?php

declare(strict_types=1);

describe('registration screen', function () {
    it('can be rendered', function () {
        $this->get(route('register'))
            ->assertStatus(200);
    });
});

describe('registration', function () {
    it('allows new users to register', function () {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('check-in.index', absolute: false));
    });
});
