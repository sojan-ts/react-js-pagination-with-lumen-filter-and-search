<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 2);
        $search = $request->input('search');
        $visibility = $request->input('visibility');
    
        $items = Item::when($search, function ($query, $search) {
            return $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        })->when($visibility, function ($query, $visibility) {
            return $query->where('visibility', $visibility);
        })->paginate($perPage);
    
        return response()->json($items);
    }
    
}