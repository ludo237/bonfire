<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('boosts', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('message_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('booster_id')->constrained('users')->cascadeOnDelete();
            $table->string('content', 16);
            $table->timestamps();

            $table->unique(['message_id', 'booster_id', 'content']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('boosts');
    }
};
