<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\modelos\producto as Producto;
use App\modelos\notas as Notas;
use App\Models\Empresa;
use App\Models\User;
use DateTime;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Webp;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;


use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class AuthenticationController extends Controller
{
    function respond($status, $data = [])
    {
        return response()->json($data, $status);
    }
    
    public function password_hash(Request $request) {
        Mail::to("pecaalta@gmail.com")->send();

        try {
            $params = $request->all();
            return $this->respond( Response::HTTP_OK, [
                'password' => Hash::make($params['password'])
            ] );
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, $th );
        }
    }

    public function login(Request $request) {
        try {
            $params = $request->all();
            $validator = Validator::make( $params, array(
                'email' => 'required|email|max:255|min:3',
                'password' => 'required|max:255|min:3',
            ));
            if($validator->fails()){
                return $this->respond( Response::HTTP_CONFLICT, $validator->messages()->toArray() );
            }
            $User = User::where('email', $params['email'])->first();
            if ($User == null) {
                return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ "No se encontro el usuario" ] ] );
            }
            if (!Hash::check($params['password'], $User->password)) {
                return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ "El password no coincide" ] ] );
            }
            do {
                $token = Crypt::encrypt(md5(uniqid()));
                $User_token = User::where('token', $token)->first();
            } while($User_token != null);
            $User->token = Hash::make($token);
            $User->expires_at = (new DateTime())->modify('+1 day');
            $User->save();

            /// send meil verifaicacion

            return $this->respond( Response::HTTP_OK, [
                'token' => $token,
                'expires_at' => $User->expires_at
            ] );
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, $th );
        }
    }
    
    public function send_reset_password(Request $request) {
        try {
            $params = $request->all();
            $validator = Validator::make( $params, array(
                'email' => 'email|required|max:255|min:3',
            ));
            if($validator->fails()){
                return $this->respond( Response::HTTP_CONFLICT, $validator->messages()->toArray() );
            }
            $User = User::where('email', $params['email'])->first();
            if ($User == null) {
                return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ "No se encontro el usuario" ] ] );
            }
            if ( !isset($User->email_verified_at) || $User->email_verified_at != null) {
                return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ "Imposible recuperar su contraseña dado que su correo no fue validado, contactese con el administrador" ] ] );
            }
            if ($User->password != null) {
                $User->password = null;
            } else if ( isset($User->expires_at) && $User->expires_at != null && strtotime($User->expires_at) > time()) {
                return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ "Ya existe un token, contactese con el administrador o espere que este exprie" ] ] );
            }
            $token = Crypt::encrypt(md5(uniqid()));
            $User->token = Hash::make($token);
            $User->expires_at = (new DateTime())->modify('+1 day');
            $User->save();
            return $this->respond( Response::HTTP_OK, [
                'token' => $token,
                'expires_at' => $User->expires_at,
                'error' => null
            ] );
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' =>  $th ] );
        }
    }
    
    public function reset_password(Request $request) {
        try {
            /*
            'email',
            'token',
            'nickname',
            'password',
            */
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, $th );
        }
    }
}
