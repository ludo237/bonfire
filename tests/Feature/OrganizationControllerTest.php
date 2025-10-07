<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->organization = Organization::factory()->create();
    $this->organization->members()->attach($this->user);

    // Set current organization in session
    session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));
});

describe('show', function () {
    it('renders organizations index component', function () {
        actingAs($this->user)
            ->get(route('organizations.show', $this->organization))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page->component('organizations/index'));
    });

    it('returns organization in props', function () {
        actingAs($this->user)
            ->get(route('organizations.show', $this->organization))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('organizations/index')
                ->has('organization.data')
                ->where('organization.data.id', $this->organization->getKey())
            );
    });

    it('returns stats in props', function () {
        actingAs($this->user)
            ->get(route('organizations.show', $this->organization))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('organizations/index')
                ->has('stats')
                ->has('stats.totalMessages')
                ->has('stats.totalMembers')
                ->has('stats.totalRooms')
            );
    });

    it('returns latest messages in props', function () {
        actingAs($this->user)
            ->get(route('organizations.show', $this->organization))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('organizations/index')
                ->has('latestMessages.data')
            );
    });

    it('returns scrollable members in props', function () {
        actingAs($this->user)
            ->get(route('organizations.show', $this->organization))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('organizations/index')
                ->has('members')
            );
    });

    it('returns scrollable rooms in props', function () {
        actingAs($this->user)
            ->get(route('organizations.show', $this->organization))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('organizations/index')
                ->has('rooms')
            );
    });

    it('requires authentication', function () {
        $this->get(route('organizations.show', $this->organization))
            ->assertRedirect(route('login'));
    });
});
