<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('push_subscriptions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('endpoint');
            $table->string('p256dh_key');
            $table->string('auth_key');
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->unique(['endpoint', 'p256dh_key', 'auth_key'], 'push_subscriptions_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('push_subscriptions');
    }
};
