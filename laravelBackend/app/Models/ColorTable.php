<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ColorTable extends Model
{
    use HasFactory;
    protected $table = 'colortable'; // Replace with your table name
    public $timestamps = false;

    public static function getAllColors()
    {
        return DB::table('colortable')
            ->select('id', 'usedFor', 'hexColor', 'description as desc')
            ->get();
    }

    public function updateColor($id, $hexColor)
    {
        $color = $this->find($id);

        if ($color) {
            $color->hexColor = $hexColor;
            $color->save();
            return true; // Success
        } else {
            return false; // Color not found
        }
    }
}
