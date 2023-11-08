<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Enrollment;

class Course extends Model
{
    use HasFactory;
    protected $table = 'course';
    protected $primaryKey = 'course_id';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'code',
        'objective',
    ];

    public function students()
    {
        return $this->hasMany(Enrollment::class, 'course_id', 'course_id');
    }

    public function instructor()
    {
        return $this->belongsTo(UserModel::class, 'instructor_id', 'userid');
    }

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id', 'program_id');
    }

    public function exams()
    {
        return $this->hasMany(Exam::class, 'course_id', 'course_id');
    }

}
