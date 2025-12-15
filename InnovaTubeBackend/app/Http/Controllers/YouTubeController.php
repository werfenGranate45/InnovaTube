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
            $query     = $request->query('find');

            if(!$query){
                 $data = $this->youtubeService->getVideos("MX", $pageToken);

                
            }else{
                // return response()->json(["pene"=>"Hola"],200);
                $data = $this->youtubeService->getVideoSearch("MX", $pageToken, $query);
            } 
            
             
           
            // Para debug: agregar campo extra

            return response()->json($data , 200);
        }catch(RuntimeException $e){
            return response()->json([
                
                'error' => 'YouTube API error',
                'message' => $e->getMessage(),
            ], 502); // Bad Gateway (API externa falló)
        } 
    }

    public function showIds(Request $request){
        $ids       = $request->query('ids');
        $pageToken = $request->query('pageToken');
        $idsArray = explode(',', $ids); // ["abc123", "def456", "ghi789"]


        
        try {
            
            $data = $this->youtubeService->getVideosIds("MX", $pageToken, $idsArray);
            
            
            return response()->json($data , 200);
            //code...
        } catch (RuntimeException $e) {

            return response()->json([
                'error' => 'YouTube API error',
                'message' => $e->getMessage(),
            ], 502); // Bad Gateway (API externa falló)

            //throw $th;
        }
    }

   
}
