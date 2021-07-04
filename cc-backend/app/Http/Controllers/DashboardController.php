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
    function respond($status, $data = []) {
        return response()->json($data, $status);
    }
    
    /**
     * Rubro
     */

    public function lista_rubro(Request $request) {
        try {
            $param = $request->all();
            $limite = isset($param['limit'])?$param['limit']:10;
            $oRubroPrincipal = $this->_lista_rubro_principal();
            $oRubroSecundaria = $this->_lista_rubro_secundaria();
            return $this->respond( Response::HTTP_OK, array(
                'principal' =>isset($param['paginado'])?$oRubroPrincipal->paginate($limite):$oRubroPrincipal->get(),
                'secundaria' =>isset($param['paginado'])?$oRubroSecundaria->paginate($limite):$oRubroSecundaria->get()  
            ));
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_rubro_empresa(Request $request, $id) {
        try {
            if (!is_numeric($id)) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ 'No es de tipo numerico'] ] );
            $oRubroPrincipal = $this->_lista_rubro_principal_empresa($id);
            $oRubroSecundaria = $this->_lista_rubro_secundaria_empresa($id);
            return $this->respond( Response::HTTP_OK, array(
                'principal' => $oRubroPrincipal,
                'secundaria' => $oRubroSecundaria  
            ));
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }
    
    public function lista_rubro_principal(Request $request) {
        try {
            $oRubroPrincipal = $this->_lista_rubro_principal()->get();
            return $this->respond( Response::HTTP_OK, $oRubroPrincipal);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_rubro_secundaria(Request $request) {
        try {
            $oRubroSecundaria = $this->_lista_rubro_secundaria()->get();
            return $this->respond( Response::HTTP_OK, $oRubroSecundaria);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_rubro_secundaria_empresa(Request $request, $id) {
        try {
            if (!is_numeric($id)) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ 'No es de tipo numerico'] ] );
            return $this->_lista_rubro_secundaria_empresa($id);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_rubro_principal_empresa(Request $request, $id) {
        try {
            return $this->_lista_rubro_principal_empresa($id);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    /**
     * Localidad
     */

    public function lista_localidad(Request $request) {
        try {
            $param = $request->all();
            $res = array();
            $limite = isset($param['limit'])?$param['limit']:10;
            if(!isset($param['localidad'])) $oDepartamento = $this->_lista_departamento();
            if(!isset($param['departamento'])) $oLocalidad = $this->_lista_localidad();
            return $this->respond( Response::HTTP_OK, array(
                'departamento' => isset($param['paginado'])?$oDepartamento->paginate($limite):$oDepartamento->get(),
                'localidad' => isset($param['paginado'])?$oLocalidad->paginate($limite):$oLocalidad->get(),
            ));
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_departamento(Request $request) {
        try {
            $oDepartamento = $this->_lista_departamento()->get();
            return $this->respond( Response::HTTP_OK, $oDepartamento);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_departamento_empresa(Request $request, $id) {
        try {
            if (!is_numeric($id)) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ 'No es de tipo numerico'] ] );
            return Empresa::Join('localidad', "localidad.id", "=", "empresa.localidad_id")
                          ->where("localidad.departamento_id", $id)
                          ->paginate();
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_localidad_departamento(Request $request, $id) {
        try {
            if (!is_numeric($id)) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ 'No es de tipo numerico'] ] );
            $oLocalidad = $this->_lista_localidad_departamento($id)->get();
            return $this->respond( Response::HTTP_OK, $oLocalidad);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_localidad_empresa(Request $request, $id) {
        try {
            if (!is_numeric($id)) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ 'No es de tipo numerico'] ] );
            return Empresa::where("empresa.localidad_id", $id)->paginate();
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }
    
    /**
     * Aniversario
     */
    public function lista_aniversario_empresa(Request $request, $month) {
        try {
            if (!is_numeric($month)) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [ 'No es de tipo numerico'] ] );
            if ($month <= 0 || $month > 12) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => ['Eesta fuera de rango'] ] );
            return Empresa::whereMonth("empresa.fecha_inicio", $month)->paginate();
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    /**
     * Movimintos
     */
    public function lista_movimintos(Request $request) {
        try {
            $param = $request->all();
            $validator = Validator::make( $param, [ 'month' => 'integer|min:1|max:13', 'year' => 'integer|min:1000|max:'.date("Y") ] );
            if($validator->fails()) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => $validator->messages()->toArray() ] );
            $year = isset($param['year']) ? $param['year'] : date("Y");
            $month = isset($param['month']) ? $param['month'] : date("m");
            $oMovimintosBaja = $this->_lista_movimintos_baja($year, $month);
            $oMovimintosAlta = $this->_lista_movimintos_alta($year, $month);


            return $this->respond( Response::HTTP_OK, array(
                "bajas" => $oMovimintosBaja,
                "altas" => $oMovimintosAlta
            ));
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_movimintos_baja(Request $request) {
        try {
            $param = $request->all();
            $validator = Validator::make( $param, [ 'month' => 'integer|min:1|max:13', 'year' => 'integer|min:1000|max:'.date("Y") ] );
            if($validator->fails()) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => $validator->messages()->toArray() ] );
            $year = isset($param['year']) ? $param['year'] : date("Y");
            $month = isset($param['month']) ? $param['month'] : date("m");
            $oMovimintos = $this->_lista_movimintos_baja($year, $month);
            return $this->respond( Response::HTTP_OK, $oMovimintos);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }

    public function lista_movimintos_alta(Request $request) {
        try {
            $param = $request->all();
            $validator = Validator::make( $param, [ 'month' => 'integer|min:1|max:13', 'year' => 'integer|min:1000|max:'.date("Y") ] );
            if($validator->fails()) return $this->respond( Response::HTTP_CONFLICT, [ 'error' => $validator->messages()->toArray() ] );
            $year = isset($param['year']) ? $param['year'] : date("Y");
            $month = isset($param['month']) ? $param['month'] : date("m");
            $oMovimintos = $this->_lista_movimintos_alta($year, $month);
            return $this->respond( Response::HTTP_OK, $oMovimintos);
        } catch (\Throwable $th) {
            return $this->respond( Response::HTTP_CONFLICT, [ 'error' => [$th->getMessage()] ] );
        }
    }


    


    /**
     * Privadas
     */

    // Localidad
    private function _lista_localidad() {
        return Empresa::select(DB::raw("localidad.nombre as nombre, localidad.id"), DB::raw("COUNT(localidad.id) as count"))
        ->join("localidad", "localidad.id", "=", "empresa.localidad_id")
        ->groupBy("empresa.localidad_id");
    }

    private function _lista_localidad_departamento($id) {
        return Empresa::select(DB::raw("localidad.nombre as nombre, localidad.id"), DB::raw("COUNT(localidad.id) as count"))
        ->Join('localidad', function ($join) use ($id) {
            $join->on("localidad.id", "=", "empresa.localidad_id")
                 ->On("localidad.departamento_id", "=", DB::raw($id));
        })
        ->groupBy("empresa.localidad_id");
    }

    private function _lista_departamento() {
        return Empresa::select(DB::raw("departamento.nombre as nombre, localidad.departamento_id"), DB::raw("COUNT(localidad.id) as count"))
            ->join("localidad", "localidad.id", "=", "empresa.localidad_id")
            ->join("departamento", "departamento.id", "=", "localidad.departamento_id")
            ->groupBy("localidad.departamento_id");
    }
    
    // Rubros
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

    private function _lista_rubro_secundaria_empresa($id) {
        return Empresa::where("empresa.rubro_secundaria_id", $id)->paginate();
    }

    private function _lista_rubro_principal_empresa($id) {
        return Empresa::where("empresa.rubro_principal_id", $id)->paginate();
    }

    // Movimintos
    private function _lista_movimintos_alta($year, $month) {
        $oList = Empresa::whereYear("empresa.created_at", $year)
                      ->whereMonth("empresa.created_at", $month)
                      ->paginate();
        $oList->setCollection( $oList->getCollection()->makeVisible( 'created_at' ) );
        return $oList;
    }

    private function _lista_movimintos_baja($year, $month) {
        $oList = Empresa::whereYear("empresa.deleted_at", $year)
                      ->whereMonth("empresa.deleted_at", $month)
                      ->paginate();
        $oList->setCollection( $oList->getCollection()->makeVisible( 'created_at' ) );
        return $oList;
    }

}
