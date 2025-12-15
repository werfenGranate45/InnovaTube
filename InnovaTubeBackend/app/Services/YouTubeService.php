<?php

namespace App\Services;

use Google_Client;
use Google_Service_YouTube;
use Google\Service\Exception as GoogleServiceException;

class YouTubeService
{
    protected Google_Service_YouTube $service;

    public function __construct(Google_Client $client)
    {
        // Configurar el cliente inyectado
        $client->setApplicationName('InnovaTubeAPI');
        //Directamente lee los archivos de los serivicios que se esten usando 
        $client->setDeveloperKey(config('services.youtube.key'));

        $this->service = new Google_Service_YouTube($client);
    }

    public function getVideos(string $country, $pageToken)
    {
        try {
            return $this->service->videos->listVideos(
                'snippet',
                [
                    'pageToken' => $pageToken ?? '', 
                    'chart' => 'MostPopular',
                    'regionCode' => $country,
                    'maxResults' => 8
                ]
            );
        } catch (GoogleServiceException $e) {
            return response()->json([
                "mensaje" => $e->getMessage(),
                "code" => $e->getCode() 

            ], 502);
        }
    }


    public function getVideosIds(string $country, $pageToken, $ids)
    {
        try {
            return $this->service->videos->listVideos(
                'snippet',
                [
                    'id' => $ids,
                    'pageToken' => $pageToken ?? '', 
                    'regionCode' => $country,
                    'maxResults' => 8
                ]
            );
        } catch (GoogleServiceException $e) {
            return response()->json([
                "mensaje" => $e->getMessage(),
                "code" => $e->getCode() 

            ], 502);
        }
    }


     public function getVideoSearch(string $country, $pageToken, $query)
    {
        try {
            return $this->service->search->listSearch(
                'snippet',
                [
                    'pageToken'  => $pageToken ?? '',
                    'regionCode' => $country,
                    'maxResults' => 8,
                    'q'          => $query,
                    'type'       => 'video'
                ]
            );
        } catch (GoogleServiceException $e) {
            return response()->json([
                "mensaje" => $e->getMessage(),
                "code" => $e->getCode() 

            ], 502);
        }
    }
}
