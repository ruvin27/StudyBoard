<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Hash;

class UserModel extends Model
{
    use HasFactory;
    protected $table = 'user'; 
    protected $primaryKey = 'userid';
    public $timestamps = false;
    protected $fillable = ['email', 'password', 'name', 'phone_number', 'role', 'verification_code', 'email_verified_at', 'approved'];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'student_id', 'userid');
    }
    public function generateVerificationCode()
{
    $verificationCode = substr(number_format(time() * rand(), 0, '', ''), 0, 6);
    $this->verification_code = $verificationCode;
}


}
