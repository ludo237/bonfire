<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('displays check-in page with user organizations', function () {
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

it('stores organization selection in session cache', function () {
    $organization = Organization::factory()->create();
    $organization->members()->attach($this->user);

    actingAs($this->user)
        ->post(route('check-in.store'), [
            'organization_id' => $organization->getKey(),
        ])
        ->assertRedirect(route('organizations.show', $organization));

    // Verify organization is stored in session cache
    $cachedOrganizationId = session()->cache()->get('current_organization_id');
    expect($cachedOrganizationId)->toBe($organization->getKey());
});

it('fails when user is not a member of the organization', function () {
    $organization = Organization::factory()->create();

    actingAs($this->user)
        ->post(route('check-in.store'), [
            'organization_id' => $organization->getKey(),
        ])
        ->assertNotFound();
});

it('requires organization_id', function () {
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
