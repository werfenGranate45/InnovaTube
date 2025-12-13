<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Obtener los datos desde el front al backend

        //IMPLEMENTAR LOS HEADEARS PARA OBTENER LOS DATOS NO IMPORTA SI SE USA EL $request->only()
        // $name      = $request->json()->get("name");
        // $last_name = $request->json()->get("last_name");
        // $username  = $request->json()->get("username");
        // $email     = $request->json()->get("email");
        // $password  = $request->json()->get("password");
        
        /**
         * const request = await fetch("http://localhost:8000/api/login", {
         *  method: "POST",
         *  headers: {
         *    "Content-Type": "application/json"
         *  },
         *   body: JSON.stringify({
         *   email,
         *     password
         *   })
         *   });
         * 
         * 
         */
        $dataUser = $request->all();
        $validation = Validator::make($dataUser,[
            "name"      => ['required', 'string', 'max:255'],
            "last_name" => ['required', 'string', 'max:255'], 
            "username"  => ['required', 'string', 'max:255', 'unique:users'],
            "email"     => ['required', 'string', 'email', 'max:255', 'unique:users'],
            "password"  => ['required', 'string', 'min:8'], 
            ]
        );

        if($validation->fails()){
             return response()->json([
                "unsuccess" => "Valores mal capturados",
                "errors" => $validation->errors()
            ], 403);

        }

        //Encripto la contraseña
        $dataUser['password'] = bcrypt($dataUser['password']);
        $user = User::create(
            $dataUser   
        );

        if(!$user){
            return response()->json([
                "unsuccess" => "Fallo en crear un usuario"
            ], 500);
        }

        return response()->json([
            "success" => "Usuario creado con éxito",
            "user" => $user
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
    }
}
