<?php

namespace App\Http\Middleware;

use App\Models\Empresa_persona;
use App\Models\User;
use Closure;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CustomAuthenticate
{
    
    public $default = [0];
    public $modales = [
        'user' => 'App\Models\user',
        'departamento' => 'App\Models\departamento',
        'tipo_relacion' => 'App\Models\tipo_relacion',
        'rubro' => 'App\Models\rubro',
        'persona' => 'App\Models\persona',
        'localidad' => 'App\Models\localidad',
        'empresa' => 'App\Models\empresa',
        'empresa_persona' => 'App\Models\empresa_persona',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $route = $request->route(); 
            $model = null;
            $reqRole = $this->default;
            $modelName = null;
            $method = null;
            $id = null;
            if (sizeof($route) > 2 && isset($route[2]['model']) && $route[2]['model'] != null && isset($route[1]['uses']) && isset(explode('@', $route[1]['uses'])[1])) {
                $id = $route[2]['id'];
                $modelName = $route[2]['model'];
                if ( !isset($this->modales[$modelName])) $model = null;
                else $model = new $this->modales[$modelName];
                $method = explode('@', $route[1]['uses'])[1];
                $reqRole = $this->resetRole($model, $method);
            }
        } catch (\Throwable $th) {            
            return response()->json([ "error" => [$th->getMessage()] ], Response::HTTP_CONFLICT);
        }

        if ($reqRole == null) return $next($request);
        $Token = $this->bearer($request->header('Authorization'));
        if ($Token == null) return response()->json([ "error" => "No se encontro token" ], Response::HTTP_OK);
        $User = User::where('token', $Token)->first();
        if ( $User == null) return response()->json([ "error" => "El token no es valido" ], Response::HTTP_OK);
        if ( isset($User->deleted_at) && $User->deleted_at != null ) return response()->json([ "error" => "El usuario fue eliminado" ], Response::HTTP_OK);
        if ( !isset($User->expires_at) || $User->expires_at == null || strtotime($User->expires_at) < time()) return response()->json([ "error" => "El token no es valido" ], Response::HTTP_OK);
        if ( !in_array($User->rol, $reqRole)) return response()->json([ "error" => "No tienes permisos para aceder a esta pagina" ], Response::HTTP_OK);
        if ($User->rol == 0 && $method == 'get' && $id != null && $modelName == 'empresa') {
            $empresa = Empresa_persona::where("persona_id", $User->persona_id)->where("empresa_id", DB::raw($id))->first();
            if ($empresa == null) return response()->json([ "error" => "No tienes permisos para aceder a esta pagina, o el elemento fue eliminado" ], Response::HTTP_OK);
        }
        return $next($request);
    }

    private function resetRole($model, $method)
    {
        if ($model == null) return $this->default;
        return isset($model['request'][$method]) ? $model['request'][$method] : $this->default;
    }

    private function bearer($token = null)
    {
        if ($token == null || $token == '' || strlen($token) <= 7 || substr($token, 0, 7) != 'Bearer ') return null;
        return substr($token, 7);
    }

     
}
