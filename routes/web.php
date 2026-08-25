<?php

use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\DocumentController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\NewsController;
use App\Http\Controllers\Public\PartnerController;
use App\Http\Controllers\Public\ServiceController;
use App\Http\Controllers\Public\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/a-propos', [AboutController::class, 'index'])->name('about');
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/equipe', [TeamController::class, 'index'])->name('team');
Route::get('/partenaires', [PartnerController::class, 'index'])->name('partners');

Route::get('/actualites', [NewsController::class, 'index'])->defaults('type', 'actualite')->name('news.index');
Route::get('/actualites/publications', [NewsController::class, 'index'])->defaults('type', 'publication')->name('news.publications');
Route::get('/actualites/communiques', [NewsController::class, 'index'])->defaults('type', 'communique')->name('news.communiques');

Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
Route::get('/documents/{document}/telecharger', [DocumentController::class, 'download'])->name('documents.download');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contact.store');
