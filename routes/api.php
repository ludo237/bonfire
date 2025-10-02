<?php

declare(strict_types=1);

use App\Http\Controllers\Api\BoostController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\TypingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/rooms/{room}/messages', [MessageController::class, 'store'])->name('api.messages.store');
    Route::post('/rooms/{room}/typing', [TypingController::class, 'store'])->name('api.typing.store');

    Route::post('/messages/{message}/boost', [BoostController::class, 'store'])->name('api.boosts.store');
    Route::delete('/messages/{message}/boost', [BoostController::class, 'destroy'])->name('api.boosts.destroy');
});
