<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;
    protected $table = 'exam';
    protected $primaryKey = 'exam_id';
    public $timestamps = false;

    protected $fillable = [
        'exam_title',
        'date',
        'description',
        'score',
        'course_id',
        'exam_duration',
        'exam_id'
    ];
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    public function grades()
    {
        return $this->hasMany(Grade::class, 'exam_id', 'exam_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'exam_id', 'exam_id');
    }

    public static function getExamWithAlias($examId)
    {
        return self::select(
            'exam_id as exam_id',
            'exam_title as exam_title',
            'exam_duration as exam_duration',
            'description as exam_description',
            'date as exam_date',
            'score as exam_score'
        )
        ->with('questions')
        ->find($examId);
    }
}
