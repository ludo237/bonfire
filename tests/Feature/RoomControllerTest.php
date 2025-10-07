<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\Room;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->organization = Organization::factory()->create();
    $this->organization->members()->attach($this->user);

    // Set current organization in session
    session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));
});

describe('index', function () {
    it('renders rooms index component', function () {
        actingAs($this->user)
            ->get(route('rooms.index'))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page->component('rooms/index'));
    });

    it('returns rooms in props', function () {
        $room = Room::factory()->create([
            'organization_id' => $this->organization->getKey(),
        ]);
        $room->users()->attach($this->user);

        actingAs($this->user)
            ->get(route('rooms.index'))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('rooms/index')
                ->has('rooms.data')
            );
    });

    it('requires authentication', function () {
        $this->get(route('rooms.index'))
            ->assertRedirect(route('login'));
    });
});

describe('show', function () {
    it('renders room show component', function () {
        $room = Room::factory()->create([
            'organization_id' => $this->organization->getKey(),
        ]);
        $room->users()->attach($this->user);

        actingAs($this->user)
            ->get(route('rooms.show', $room))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page->component('rooms/show'));
    });

    it('returns room in props', function () {
        $room = Room::factory()->create([
            'organization_id' => $this->organization->getKey(),
        ]);
        $room->users()->attach($this->user);

        actingAs($this->user)
            ->get(route('rooms.show', $room))
            ->assertSuccessful()
            ->assertInertia(fn ($page) => $page
                ->component('rooms/show')
                ->has('room.data')
                ->where('room.data.id', $room->getKey())
            );
    });

    it('returns forbidden when user is not a member', function () {
        $room = Room::factory()->create([
            'organization_id' => $this->organization->getKey(),
        ]);

        actingAs($this->user)
            ->get(route('rooms.show', $room))
            ->assertForbidden();
    });

    it('requires authentication', function () {
        $room = Room::factory()->create([
            'organization_id' => $this->organization->getKey(),
        ]);

        $this->get(route('rooms.show', $room))
            ->assertRedirect(route('login'));
    });
});
