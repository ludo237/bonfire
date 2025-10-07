<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->organization = Organization::factory()->create();
    $this->organization->members()->attach($this->user);

    session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));
});

describe('two factor settings page', function () {
    it('can be rendered with password confirmation', function () {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $this->actingAs($this->user)
            ->withSession(['auth.password_confirmed_at' => time()])
            ->get(route('two-factor.show'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/two-factor')
                ->where('twoFactorEnabled', false)
            );
    });

    it('requires password confirmation when enabled', function () {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => true,
        ]);

        $this->actingAs($this->user)
            ->get(route('two-factor.show'))
            ->assertRedirect(route('password.confirm'));
    });

    it('does not require password confirmation when disabled', function () {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        Features::twoFactorAuthentication([
            'confirm' => true,
            'confirmPassword' => false,
        ]);

        $this->actingAs($this->user)
            ->get(route('two-factor.show'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('settings/two-factor')
            );
    });

    it('returns forbidden when two factor is disabled', function () {
        if (! Features::canManageTwoFactorAuthentication()) {
            $this->markTestSkipped('Two-factor authentication is not enabled.');
        }

        config(['fortify.features' => []]);

        $this->actingAs($this->user)
            ->withSession(['auth.password_confirmed_at' => time()])
            ->get(route('two-factor.show'))
            ->assertForbidden();
    });
});
