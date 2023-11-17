<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;
    protected $table = 'grades';
    protected $primaryKey = 'grade_id';
    public $timestamps = false;
    
    public function course()
    {
        return $this->belongsTo(Exam::class, 'exam_id', 'exam_id');
    }

    

    protected $fillable = ['exam_id', 'course_id', 'student_id', 'date', 'score'];
}
