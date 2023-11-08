<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\UserModel;

class Enrollment extends Model
{
    use HasFactory;
    protected $table = 'enrollment';
    protected $primaryKey = 'enrollment_id';
    public $timestamps = false;

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    public function user()
    {
        return $this->belongsTo(UserModel::class, 'student_id', 'userid');
    }

}
