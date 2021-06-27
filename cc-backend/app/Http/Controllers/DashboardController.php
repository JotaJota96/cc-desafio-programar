<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\modelos\producto as Producto;
use App\modelos\notas as Notas;
use App\Models\Empresa;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Webp;
use Illuminate\Support\Str;


use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    function respond($status, $data = [])
    {
        return response()->json($data, $status);
    }

    public function lista_rubro(Request $request) {
        try {
            $oRubroPrincipal = $this->_lista_rubro_principal()->get();
            $oRubroSecundaria = $this->_lista_rubro_secundaria()->get();
            return $this->respond( Response::HTTP_OK, array(
                'principal' => $oRubroPrincipal,
                'secundaria' => $oRubroSecundaria  
            ) );
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, $th );
        }
    }
    
    public function lista_rubro_principal(Request $request) {
        try {
            $oRubroPrincipal = $this->_lista_rubro_principal()->get();
            return $this->respond( Response::HTTP_OK, $oRubroPrincipal);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, $th );
        }
    }

    public function lista_rubro_secundaria(Request $request) {
        try {
            $oRubroSecundaria = $this->_lista_rubro_secundaria()->get();
            return $this->respond( Response::HTTP_OK, $oRubroSecundaria);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, $th );
        }
    }

    public function lista_localidad(Request $request) {
        try {
            $oLocalidad = Empresa::select(DB::raw("localidad.nombre as nombre"), DB::raw("COUNT(localidad.id) as count"))
            ->join("localidad", "localidad.id", "=", "empresa.localidad_id")
            ->groupBy("empresa.localidad_id")
            ->get();
            return $this->respond( Response::HTTP_OK, $oLocalidad );
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, $th );
        }
    }

    private function _lista_rubro_secundaria() {
        return Empresa::select(DB::raw("rubro.nombre as nombre"), DB::raw("COUNT(rubro.id) as count"))
        ->join("rubro", "rubro.id", "=", "empresa.rubro_secundaria_id")
        ->groupBy("empresa.rubro_secundaria_id");
    }

    private function _lista_rubro_principal() {
        return Empresa::select(DB::raw("rubro.nombre as nombre"), DB::raw("COUNT(rubro.id) as count"))
            ->join("rubro", "rubro.id", "=", "empresa.rubro_principal_id")
            ->groupBy("empresa.rubro_principal_id");
    }
    
    
}
