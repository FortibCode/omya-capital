<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Favicon — symbole du logo OMYA CAPITAL -->
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <meta name="theme-color" content="#0B1F33">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap" rel="stylesheet" />
        <!-- Lenis smooth-scroll base styles -->
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css">
        <style>
            :root {
                --font-poppins: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
            }
            body {
                font-family: var(--font-poppins);
            }
            /* Hide default cursor on desktop — LiquidCursor takes over the feel */
            @media (hover: hover) {
                html { cursor: none; }
                a, button, [role="button"], [tabindex] { cursor: none; }
            }
            /* Smooth page transitions — prevent layout shift during crossfade */
            html { scroll-behavior: auto !important; } /* Lenis handles it */
        </style>

        <!-- Hero image — preloaded only on the page that actually renders it -->
        @if (($page['component'] ?? null) === 'Home')
            <link rel="preload" as="image" href="/images/christelle-basilua-semy.jpeg" fetchpriority="high">
        @endif

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#0B1F33] text-white">
        @inertia
    </body>
</html>
