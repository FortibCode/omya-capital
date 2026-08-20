<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'type',
        'excerpt',
        'content',
        'cover_image_path',
        'attachment_path',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];
}
