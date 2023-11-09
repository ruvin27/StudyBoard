<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamResolution extends Model
{
    use HasFactory;
    protected $table = 'exam_resolution';
    protected $primaryKey = 'resolution_id';
    public $timestamps = false;
    protected $fillable = [
        'exam_id',
        'qa_officer_resolved',
        'program_coordinator_resolved',
        'avg_score',
        'total'
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id', 'exam_id');
    }
}
