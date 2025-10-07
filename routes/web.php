<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CheckInController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JoinController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('guest')->group(function () {
    Route::prefix('register')->group(function () {
        Route::get('', [RegisteredUserController::class, 'create'])->name('register');
        Route::post('', [RegisteredUserController::class, 'store'])->name('register.store');
    });

    Route::prefix('login')->group(function () {
        Route::get('', [AuthenticatedSessionController::class, 'create'])->name('login');
        Route::post('', [AuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    Route::prefix('forgot-password')->group(function () {
        Route::get('', [PasswordResetLinkController::class, 'create'])->name('password.request');
        Route::post('', [PasswordResetLinkController::class, 'store'])->name('password.email');
    });

    Route::prefix('reset-password')->group(function () {
        Route::get('{token}', [NewPasswordController::class, 'create'])->name('password.reset');
        Route::post('', [NewPasswordController::class, 'store'])->name('password.store');
    });
});

Route::prefix('join')->group(function () {
    Route::prefix('{code}')->group(function () {
        Route::get('', [JoinController::class, 'show'])->name('join.show');
        Route::post('', [JoinController::class, 'store'])->name('join.store');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('check-in')->group(function () {
        Route::get('', [CheckInController::class, 'index'])->name('check-in.index');
        Route::post('', [CheckInController::class, 'store'])->name('check-in.store');
    });
});

Route::middleware(['auth', 'organization.selected'])->group(function () {
    Route::prefix('organizations')->group(function () {
        Route::prefix('{organization}')->group(function () {
            Route::get('', [OrganizationController::class, 'show'])->name('organizations.show');
        });
    });

    Route::prefix('rooms')->group(function () {
        Route::get('', [RoomController::class, 'index'])->name('rooms.index');

        Route::prefix('{room}')->group(function () {
            Route::get('', [RoomController::class, 'show'])->name('rooms.show');

            Route::prefix('members')->group(function () {
                Route::post('', [MembershipController::class, 'store'])->name('rooms.members.store');
                Route::delete('', [MembershipController::class, 'destroy'])->name('rooms.members.destroy');
            });

            Route::patch('membership', [MembershipController::class, 'update'])->name('rooms.membership.update');
        });
    });

    Route::prefix('users/me')->group(function () {
        Route::get('', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::prefix('security')->group(function () {
            Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');
            Route::put('password', [PasswordController::class, 'update'])
                ->middleware('throttle:6,1')
                ->name('password.update');

            Route::get('two-factor-authentication', [TwoFactorAuthenticationController::class, 'show'])->name('two-factor.show');
        });

        Route::prefix('email')->group(function () {
            Route::prefix('verify')->group(function () {
                Route::get('', EmailVerificationPromptController::class)->name('verification.notice');
                Route::get('{id}/{hash}', VerifyEmailController::class)
                    ->middleware(['signed', 'throttle:6,1'])
                    ->name('verification.verify');
            });

            Route::post('verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');
        });
    });

    Route::delete('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
