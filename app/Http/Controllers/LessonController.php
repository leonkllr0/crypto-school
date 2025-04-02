<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Vite;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class LessonController extends Controller
{
    public function show(int $id): InertiaResponse
    {
        // Normally you'd query the DB. Here's mock data:
        $lesson = collect($this->getMockLessons())->firstWhere('id', $id);

        abort_unless($lesson, 404);

        return Inertia::render('Lesson', [
            'lesson' => $lesson,
        ]);
    }

    private function getMockLessons(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'Neon Shadows',
                'desc' => 'Master the art of low-light storytelling.',
                'logo' => Vite::image('cyber-stream-small-logo.png'),
                'videoUrl' => 'https://crypto-school.lon1.digitaloceanspaces.com/Meet_Boris_Full-Stack_Engineer.mp4',
                'progressBarColor' => 'red',
                'quiz' => [
                    'title' => 'Feel strong about Neon Shadows? Take short quiz now!',
                    'buttonText' => 'Take short Quiz - 1',
                    'experimentCode' => 'Default-Quiz',
                ]
            ],
            [
                'id' => 2,
                'title' => 'Synthwave Basics',
                'desc' => 'Explore the sounds of the future.',
                'logo' => Vite::image('cyber-stream-small-logo.png'),
                'videoUrl' => 'https://crypto-school.lon1.digitaloceanspaces.com/Meet_Boris_Full-Stack_Engineer.mp4',
                'progressBarColor' => 'green',
                'quiz' => [
                    'title' => 'Feel strong about Neon Shadows? Take short quiz now!',
                    'buttonText' => 'Take short Quiz - 2',
                    'experimentCode' => 'Default-Quiz',
                ]
            ],
            [
                'id' => 3,
                'title' => 'Glitch Aesthetics',
                'desc' => 'Harness distortion as a design language.',
                'logo' => Vite::image('cyber-stream-small-logo.png'),
                'videoUrl' => 'https://crypto-school.lon1.digitaloceanspaces.com/Meet_Boris_Full-Stack_Engineer.mp4',
                'progressBarColor' => 'blue',
                'quiz' => [
                    'title' => 'Feel strong about Neon Shadows? Take short quiz now!',
                    'buttonText' => 'Take short Quiz - 3',
                    'experimentCode' => 'Default-Quiz',
                ]
            ],
        ];
    }
}