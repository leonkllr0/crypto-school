<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">

    <title inertia>{{ config('app.name', 'Crypto School') }}</title>

    <meta name="robots" content="noindex, nofollow">

    <!-- Viewport tag -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Language tag -->
    <meta name="language" content="{{ app()->getLocale() }}" />

    <meta name="description"
        content="This web is built specially for the Crypto School team. Click on any lesson to know me better" />

    <!-- Open Graph tags -->
    <meta property="og:title" content="Hire new Colleague!" />
    <meta property="og:description"
        content="This web is built specially for the Crypto School team. Click on any lesson to know me better" />
    <meta property="og:image" content="{{ Vite::image('cyberpunk-hero.png') }}" />
    <meta property="og:url" content="{{ request()->url() }}" />

    <!-- Twitter tags -->
    {{-- <meta property="twitter:card" content="summary" /> --}}
    <meta property="twitter:title" content="Hire new Colleague!" />
    <meta property="twitter:description"
        content="This web is built specially for the Crypto School team. Click on any lesson to know me better" />
    <meta property="twitter:image" content="{{ Vite::image('cyberpunk-hero.png') }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @vite(['resources/js/app.ts'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
