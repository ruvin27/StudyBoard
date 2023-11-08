<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    protected $table = 'program';
    protected $primaryKey = 'program_id';
    public $timestamps = false;
    public function courses()
    {
        return $this->hasMany(Course::class, 'program_id', 'program_id');
    }
}
