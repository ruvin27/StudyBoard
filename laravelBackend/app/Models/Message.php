<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $primaryKey = 'ID';
    public $timestamps = false;
    protected $fillable = ['sender', 'receiver', 'message'];

    public function sender()
    {
        return $this->belongsTo(Program::class, 'sender', 'email');
    }
    public function receiver()
    {
        return $this->belongsTo(Program::class, 'receiver', 'email');
    }
}
