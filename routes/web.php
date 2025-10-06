<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JoinController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', HomeController::class)->name('home');

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

Route::middleware(['auth', 'active'])->group(function () {
    Route::resource('rooms', RoomController::class);

    Route::prefix('rooms/{room}')->group(function () {
        Route::prefix('members')->group(function () {
            Route::post('', [MembershipController::class, 'store'])->name('rooms.members.store');
            Route::delete('', [MembershipController::class, 'destroy'])->name('rooms.members.destroy');
        });

        Route::patch('membership', [MembershipController::class, 'update'])->name('rooms.membership.update');
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
