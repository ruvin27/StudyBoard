<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Enrollment;

class UserModel extends Model
{
    use HasFactory;
    protected $table = 'user'; 
    protected $primaryKey = 'userid';
    public $timestamps = false;

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'student_id', 'userid');
    }

}
