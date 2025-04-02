<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Vite;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class HomeController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Home', [
            'hero' => [
                'image' => Vite::image('cyberpunk-hero.png'),
                'title' => 'Hire new Colleague!',
                'subtitle' => 'This web is built specially for the Crypto School team. Click on any lesson to know me better 😊',
            ],
            'lessons' => $this->getMockLessons(),
        ]);
    }

    private function getMockLessons(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'Neon Shadows',
                'desc' => 'Master the art of low-light storytelling.',
            ],
            [
                'id' => 2,
                'title' => 'Synthwave Basics',
                'desc' => 'Explore the sounds of the future.',
            ],
            [
                'id' => 3,
                'title' => 'Glitch Aesthetics',
                'desc' => 'Harness distortion as a design language.',
            ],
        ];
    }
}