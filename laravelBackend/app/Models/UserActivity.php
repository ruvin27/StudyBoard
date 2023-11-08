<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActivity extends Model
{
    use HasFactory;
    protected $table = 'userActivity'; 
    protected $primaryKey = 'userActivity_id';
    public $timestamps = false;

    protected $fillable = ['email', 'role'];

}
