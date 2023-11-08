<?php

namespace App\Http\Controllers;

use App\Models\ColorTable;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function getColorTable()
    {
        $colors = ColorTable::getAllColors();
        return response()->json($colors);
    }

    public function updateColor(Request $request)
    {
        $data = $request->all();

        if (isset($data['hexColor']) && isset($data['id'])) {
            $hexColor = $data['hexColor'];
            $id = $data['id'];

            $colorTable = new ColorTable();

            if ($colorTable->updateColor($id, $hexColor)) {
                return response()->json('Color Updated');
            } else {
                return response()->json('Color not found', 404);
            }
        } else {
            return response()->json('Incomplete data', 400);
        }
    }


}
