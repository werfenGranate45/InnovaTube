<?php

namespace App\Http\Controllers;

use App\Models\FavoriteVideos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FavoriteVideosController extends Controller
{
    public function show(Request $request){
        $id = $request->user()->getKey();

        $favoritos = FavoriteVideos::where('user_id', $id )->where('deleted_at', null)->get(); 
        
        return response()->json([
            "favoritos" => $favoritos
        ], 200);
    }


    public function store(Request $request)
    {
        $data     = $request->all();
        

        $validation = Validator::make($data, [
            "checked" => ['required', 'boolean'],
            "videoId" => ['required', 'string']
        ]);

        if ($validation->fails()) {
            return response()->json([
                "unsuccess" => "Valores mal capturados",
                "errors" => $validation->errors()
            ], 403);
        }

        $data["user_id"]  = $request->user()->getKey();
        $data["id_video"] = $data["videoId"];
        $data["is_favorite" ] = $data["checked"];
        
        // $exist = $request->user()->favorites()->where('id_video', $data["videoId"])->firstOrFail();

        // if($exist){
        //     return response([
        //         "unsuccess" => "Duplicado"
        //     ], 401);
        // }
        $favorite = FavoriteVideos::create(
            $data
        );

        if (!$favorite) {
            return response()->json([
                "unsuccess" => "Error al crear",
            ], 500);
        }

        return response()->json([
            "exito" => "Se ha creado",
            "favorito" => $favorite
        ], 200);
    }

    public function destroy(Request $request)
    {
        try {
            $request->user()->favorites()
                ->where('id_video', $request->video_id)
                ->delete();
            return response()->json(['ok' => true]);
        } catch (\Throwable $th) {

            return response()->json([
                'ok' => false,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }
}
