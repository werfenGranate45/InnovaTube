<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Crear un login y un logout

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
           return response()->json([
            'unsuccess' => 'Las credenciales son incorrectas'
           ], 403);
        }

        return response()->json([
            'success' => 'Login correcto',
            'token' => $user->createToken('api-token')->plainTextToken,
        ], 200);
    }

    public function logout(Request $request){

        //Con esto elimina el token de la session en turno
        $request->user()->currentAccessToken()->delete();

        return response()->json(['success' => 'S']);
    }

    public function register(Request $request){
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
}
