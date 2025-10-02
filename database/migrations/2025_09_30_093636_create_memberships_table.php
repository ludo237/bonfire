<?php

declare(strict_types=1);

use App\InvolvementLevel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->foreignUlid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('room_id')->constrained()->cascadeOnDelete();
            $table->string('involvement')->default(InvolvementLevel::ALL->value);
            $table->integer('connections')->default(0);
            $table->timestamp('connected_at')->nullable();
            $table->timestamp('unread_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'room_id']);
            $table->index(['room_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};
