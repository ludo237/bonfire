<?php

declare(strict_types=1);

use App\Models\Organization;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->organization = Organization::factory()->create();
    $this->organization->members()->attach($this->user);
});

it('redirects to check-in when no organization is selected', function () {
    actingAs($this->user)
        ->get(route('rooms.index', $this->organization))
        ->assertRedirect(route('check-in.index'));
});

it('allows access when organization is selected in session cache', function () {
    // Store organization in session cache
    session()->cache()->put('current_organization_id', $this->organization->getKey());

    actingAs($this->user)
        ->get(route('organizations.show', $this->organization))
        ->assertSuccessful();
});

it('does not block check-in routes', function () {
    actingAs($this->user)
        ->get(route('check-in.index'))
        ->assertSuccessful();
});

it('blocks access to organization routes without session cache', function () {
    actingAs($this->user)
        ->get(route('organizations.show', $this->organization))
        ->assertRedirect(route('check-in.index'));
});

it('blocks access to room routes without session cache', function () {
    $room = Room::factory()
        ->for($this->organization)
        ->create();

    $room->grantAccessTo(collect([$this->user]));

    actingAs($this->user)
        ->get(route('rooms.show', [$this->organization, $room]))
        ->assertRedirect(route('check-in.index'));
});
