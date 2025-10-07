<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
});

describe('index', function () {
    it('renders check-in component', function () {
        actingAs($this->user)
            ->get(route('check-in.index'))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page->component('check-in'));
    });

    it('returns user organizations in props', function () {
        $organization = Organization::factory()->create();
        $organization->members()->attach($this->user);

        actingAs($this->user)
            ->get(route('check-in.index'))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('check-in')
                ->has('organizations.data', 1)
                ->where('organizations.data.0.id', $organization->getKey())
                ->where('organizations.data.0.name', $organization->name)
            );
    });

    it('requires authentication', function () {
        $this->get(route('check-in.index'))
            ->assertRedirect(route('login'));
    });
});

describe('store', function () {
    it('redirects to organization on success', function () {
        $organization = Organization::factory()->create();
        $organization->members()->attach($this->user);

        actingAs($this->user)
            ->post(route('check-in.store'), [
                'organization_id' => $organization->getKey(),
            ])
            ->assertRedirect(route('organizations.show', $organization));
    });

    it('returns not found when user is not a member', function () {
        $organization = Organization::factory()->create();

        actingAs($this->user)
            ->post(route('check-in.store'), [
                'organization_id' => $organization->getKey(),
            ])
            ->assertNotFound();
    });

    it('validates organization_id is required', function () {
        actingAs($this->user)
            ->post(route('check-in.store'), [])
            ->assertInvalid(['organization_id']);
    });

    it('validates organization exists', function () {
        actingAs($this->user)
            ->post(route('check-in.store'), [
                'organization_id' => 'non-existent-id',
            ])
            ->assertInvalid(['organization_id']);
    });

    it('requires authentication', function () {
        $organization = Organization::factory()->create();

        $this->post(route('check-in.store'), [
            'organization_id' => $organization->getKey(),
        ])
            ->assertRedirect(route('login'));
    });
});
