<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    use HasFactory;
    protected $table = 'recommendation';
    protected $primaryKey = 'recommendation_id';
    public $timestamps = false;
    protected $fillable = [
        'course_id',
        'sender_id',
        'message'
    ];
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    public function sender()
    {
        return $this->belongsTo(UserModel::class, 'sender_id', 'userid');
    }
}
