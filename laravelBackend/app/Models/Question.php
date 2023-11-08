<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $table = 'question';
    protected $primaryKey = 'question_id';
    public $timestamps = false;
    protected $fillable = [
        'exam_id',
        'question',
        'answer',
        'mcq1',
        'mcq2',
        'mcq3',
        'mcq4',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id', 'exam_id');
    }
}
