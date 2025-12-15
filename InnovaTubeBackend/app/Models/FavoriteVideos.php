<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FavoriteVideos extends Model
{
    use SoftDeletes;
    
    protected $table = "favorite_videos";

    protected $fillable = [
        'user_id',
        'id_video',
        'is_favorite'
    ];

    public function Users(){
        return $this->belongsTo(User::class);
    }
}
