<?php

declare(strict_types=1);

use App\Models\Media;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->organization = Organization::factory()->create();
    $this->organization->members()->attach($this->user);

    session()->cache()->put('current_organization_id', $this->organization->getKey(), now()->addDays(30));
});

describe('profile page', function () {
    it('can be displayed', function () {
        $this->actingAs($this->user)
            ->get(route('profile.edit'))
            ->assertOk();
    });
});

describe('profile update', function () {
    it('allows updating profile information', function () {
        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        $this->user->refresh();

        expect($this->user->name)->toBe('Test User');
        expect($this->user->email)->toBe('test@example.com');
        expect($this->user->email_verified_at)->toBeNull();
    });

    it('preserves verification status when email is unchanged', function () {
        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => 'Test User',
                'email' => $this->user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        expect($this->user->refresh()->email_verified_at)->not->toBeNull();
    });

    it('allows uploading avatar with profile update', function () {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('avatar.jpg', 100, 100);

        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'avatar' => $file,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('profile.edit'));

        $this->user->refresh();

        expect($this->user->avatar_id)->not->toBeNull();

        $media = Media::find($this->user->avatar_id);
        expect($media)->not->toBeNull();
        expect($media->extension)->toBe('jpg');
        expect($media->original_name)->toBe('avatar.jpg');
        expect($media->mime_type)->toBe('image/jpeg');
        expect($media->size)->toBeGreaterThan(0);

        Storage::disk('public')->assertExists('avatars/'.$media->name.'.'.$media->extension);
    });

    it('replaces old avatar when uploading new one', function () {
        Storage::fake('public');

        $oldFile = UploadedFile::fake()->image('old-avatar.png');
        $oldPath = $oldFile->store('avatars', 'public');

        $oldMedia = Media::create([
            'name' => pathinfo($oldPath, PATHINFO_FILENAME),
            'extension' => 'png',
            'original_name' => 'old-avatar.png',
            'mime_type' => 'image/png',
            'size' => $oldFile->getSize(),
        ]);

        $this->user->update(['avatar_id' => $oldMedia->id]);

        $newFile = UploadedFile::fake()->image('new-avatar.jpg');

        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'avatar' => $newFile,
            ]);

        $response->assertSessionHasNoErrors();

        $this->user->refresh();

        expect($this->user->avatar_id)->not->toBe($oldMedia->id);
        expect(Media::find($oldMedia->id))->toBeNull();

        $newMedia = Media::find($this->user->avatar_id);
        expect($newMedia->extension)->toBe('jpg');
    });

    it('validates avatar file type', function () {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'avatar' => $file,
            ]);

        $response->assertSessionHasErrors('avatar');

        $this->user->refresh();
        expect($this->user->avatar_id)->toBeNull();
    });

    it('validates avatar file size', function () {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('avatar.jpg', 3000);

        $response = $this
            ->actingAs($this->user)
            ->patch(route('profile.update'), [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'avatar' => $file,
            ]);

        $response->assertSessionHasErrors('avatar');

        $this->user->refresh();
        expect($this->user->avatar_id)->toBeNull();
    });
});

describe('account deletion', function () {
    it('allows user to delete their account', function () {
        $user = $this->user;

        $response = $this
            ->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'supersecret',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('home'));

        $this->assertGuest();
        expect($user->fresh()->trashed())->toBeTrue();
    });

    it('requires correct password to delete account', function () {
        $response = $this
            ->actingAs($this->user)
            ->from(route('profile.edit'))
            ->delete(route('profile.destroy'), [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect(route('profile.edit'));

        expect($this->user->fresh())->not->toBeNull();
    });
});
