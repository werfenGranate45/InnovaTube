<?php

namespace App\Http\Controllers;

use App\Services\YouTubeService;
use RuntimeException;
use Illuminate\Http\Request;

class YouTubeController extends Controller
{
    protected YouTubeService $youtubeService;
    
    public function __construct(YouTubeService $youtubeService)
    {
        $this->youtubeService = $youtubeService;
    }
    
    public function show(Request $request){
        //No maneja los errores autiomaticamente, por ende en el metodo debes validarlo con un try
       
        
        try{
            //Esto busca en la URL del navegador no hace fetch de los datos, por lo tanto que bueno es mejor aca
            $pageToken = $request->query('pageToken'); // <- así lo recibes y lo busca ente 
            $data = $this->youtubeService->getMostPopular("MX", $pageToken);
            return response()->json($data, 200);
        }catch(RuntimeException $e){
            return response()->json([
                'error' => 'YouTube API error',
                'message' => $e->getMessage(),
            ], 502); // Bad Gateway (API externa falló)
        } 
    }

   
}
