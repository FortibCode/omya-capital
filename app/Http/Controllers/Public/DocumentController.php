<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Documents/Index', [
            'documents' => Document::latest('published_at')->get(),
        ]);
    }

    public function download(Document $document): StreamedResponse
    {
        abort_unless($document->file_path, 404);

        return Storage::disk('public')->download($document->file_path, $document->name);
    }
}
