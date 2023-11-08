<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objective extends Model
{
    use HasFactory;
    protected $primaryKey = 'objective_id';
    public $timestamps = false;

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id', 'program_id');
    }
}
