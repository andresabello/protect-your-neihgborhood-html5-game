<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Protect Your Neighborhood</title>
    <link href="{{ asset('css/front-end.css') }}" rel="stylesheet">
</head>
<body class="text-center">
<div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
    <header class="masthead mb-auto">
        <div class="inner">
            @if (Route::has('login'))
                <h3 class="masthead-brand">Protect</h3>
                <nav class="nav nav-masthead justify-content-center">
                    @auth
                        <a href="{{ url('/home') }}" class="btn btn-link">Home</a>
                    @else
                        <a href="{{ route('login') }}" class="btn btn-link">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="btn btn-link">Register</a>
                        @endif
                    @endauth
                </nav>
            @endif

        </div>
    </header>
    <main role="main" class="inner cover">
        <h1 class="cover-heading">Protect Your Neighborhood</h1>
        <p class="lead">You must protect your neighborhood from the incoming space invaders</p>
        <div id="app">
            <protect-your-house></protect-your-house>
        </div>
    </main>
    <footer class="mastfoot mt-auto">
        <div class="inner">
            <p>Game by <a href="https://twitter.com/andresab3llo">@andresab3llo</a>.</p>
        </div>
    </footer>
</div>
<script async defer src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_API') }}"></script>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
