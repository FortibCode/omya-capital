<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'services' => Service::orderBy('sort_order')->get(),
            'partners' => Partner::orderBy('sort_order')->get(),
            'posts' => Post::latest('published_at')->take(3)->get(),
        ]);
    }
}
