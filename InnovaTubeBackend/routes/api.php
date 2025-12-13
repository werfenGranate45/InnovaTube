<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/login",    [AuthController::class, "login"])->name("login");
Route::post("/register", [AuthController::class, "register"])->name("register");

//Con el middleware utilizo la proteccion, en caso de no estar autorizado
Route::middleware('auth:sanctum')->group(function (){
    Route::apiResource("/user", UserController::class);
    Route::post("/logout",   [AuthController::class, "logout"])->name("logout");
});