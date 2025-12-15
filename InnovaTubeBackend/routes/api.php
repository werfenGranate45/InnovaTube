<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YouTubeController;
use Illuminate\Support\Facades\Route;

Route::post("/login",    [AuthController::class, "login"])->name("login");
Route::post("/register", [AuthController::class, "register"])->name("register");
Route::get("/youtube", [YouTubeController::class, "show"])->name("youtube");

//Con el middleware utilizo la proteccion, en caso de no estar autorizado
Route::middleware('auth:sanctum')->group(function (){
    Route::apiResource("/user", UserController::class);
    Route::post("/logout",   [AuthController::class, "logout"])->name("logout");
});