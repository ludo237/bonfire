<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sha256(),
            'extension' => $this->faker->fileExtension(),
            'original_name' => $this->faker->word(),
            'mime_type' => $this->faker->mimeType(),
            'width' => $this->faker->randomNumber(),
            'height' => $this->faker->randomNumber(),
            'size' => $this->faker->randomNumber(),
        ];
    }
}
