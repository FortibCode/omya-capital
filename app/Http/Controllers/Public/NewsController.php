<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(string $type = 'actualite'): Response
    {
        return Inertia::render('News/Index', [
            'activeType' => $type,
            'posts' => Post::where('type', $type)->latest('published_at')->get(),
        ]);
    }
}
