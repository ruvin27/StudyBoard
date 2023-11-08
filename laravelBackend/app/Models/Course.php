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

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'course_id', 'course_id');
    }
}
