<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    protected $primaryKey = 'grade_id';
    public $timestamps = false;
    
    public function course()
    {
        return $this->belongsTo(Exam::class, 'exam_id', 'exam_id');
    }
}
