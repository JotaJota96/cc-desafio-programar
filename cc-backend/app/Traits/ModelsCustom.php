<?php
namespace App\Traits;
use App;
use Illuminate\Http\Request;
use Illuminate\Http\response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

/**
 * @queryNameParam:string Parametro de busqueda es q por defecto en caso de ser diferente setear en el model base
 * @incluidRelationships:boolean Parametro de para solicitar dataos completos es full por defecto en caso de ser diferente setear en el model base
 * @Relationships:Array Listado de relaciones que se deceen editar en la recursividad de creacion y solicirudes de ser diferente setear en el model base
 * _createNameForingkey():string Funcion a reescribir de ser nesesaria
 */
trait ModelsCustom 
{
    
    public static function customGet($id = null)
    {
        if ($id == null) return self::customGetAll();
        $oModels = self::find($id);
        self::addFull(Request()->all(), $oModels);
        return $oModels->first();
    }
    
    public static function _caunt($oModels = null, $select = null, $fillable = null, $param = null)
    {
        $oModels = self::customselectAll($oModels, $select, $fillable, $param);
        return $oModels->count();
    }

    public function _fillable()
    {
        return $this->fillable;
    }

    public static function _validate($metodo) 
    {
        if (isset(self::$rules[$metodo])){
            $validator = Validator::make(Request()->all(), self::$rules[$metodo]);
            if ($validator->fails()) {
                return [
                    'code' => 400,
                    'body' => $validator->errors()
                ];
            }
        }
        return [
            'code' => 200,
        ];
    }

    public static function _create($param = null) 
    {
        try {
            if ($param == null) $param = Request()->all();
            DB::beginTransaction();
            $oModels = new self();
            self::_createBelongsTo($param, $oModels);
            self::_createHasOne($param, $oModels);
            $validatedData = self::_validate('get');
            $oModels = self::create($param);
            self::_createHasMany($param, $oModels);
            DB::commit();
            return $oModels;
        } catch (\Throwable $th) {
            throw $th;
            DB::rollback();
        }
        return null;
    }


    private static function customGetAll($oModels = null, $select = null, $fillable = null, $param = null)
    {
        $oModels = self::customselectAll($oModels, $select, $fillable, $param);
        $limit = (isset($param["limit"])) ? $param["limit"] : 10;
        return $oModels->paginate($limit);
    }

    private static function customselectAll($oModels = null, $select = null, $fillable = null, $param = null)
    {
        if ($oModels == null) $oModels = new self();
        if ($param == null) $param = Request()->all();
        if ($fillable == null) $fillable = $oModels->fillable;
        foreach ($fillable as $key) {
            if (isset($param[$key])) {
                $oModels = $oModels->where($key, 'like', '%'. $param[$key].'%'); 
            }
        }
        self::addFull($param, $oModels);

        $queryNameParam = isset($oModels->queryNameParam) ? $oModels->queryNameParam : 'q';

        if (isset($param[$queryNameParam])) {
            $queryParamSearch = (!isset($oModels->queryParamSearch) || $oModels->queryParamSearch == null) ? $fillable : $oModels->queryParamSearch;
            if (sizeof($queryParamSearch) > 0) {
                $oModels = $oModels->where(array_pop($queryParamSearch), 'like', '%'. $param[$queryNameParam].'%'); 
                foreach ($queryParamSearch as $key) {
                    $oModels = $oModels->orWhere($key, 'like', '%'. $param[$queryNameParam].'%'); 
                }
            }
        }
        if ($select != null) $oModels = $oModels->select($select);
        return $oModels;
    }

    /**
     * Mergea todos las relaciones del modelo en base en caso de mandar por parametro full
     * si se quiere una remplasar el nombre del parametro setear incluidRelationships en el modelo
     */
    private static function addFull($param, &$oModels)
    {
        $incluidRelationships = isset($oModels->incluidRelationships) ? $oModels->incluidRelationships : 'full';
        if (isset($param[$incluidRelationships]) && ($param[$incluidRelationships] == 1 || $param[$incluidRelationships])) {
            $lRelationships = [];
            if(isset($oModels->Relationships)) {
                foreach ($oModels->Relationships as $slRelationships) {
                    $lRelationships = array_merge($lRelationships, $slRelationships);
                }
            }
            $oModels = $oModels->with($lRelationships);
        }
    }

    public function myGetAllRelationships($name, $select = null)
    {
        $oModels = $this;
        if(isset($oModels->Relationships['hasMany']) && in_array($name, $oModels->Relationships['hasMany'])) {
            return self::__myGetAll(call_user_func(array($this, $name)), $select, $this->fillable);
        } else if(isset($oModels->Relationships['belongsTo']) && in_array($name, $oModels->Relationships['belongsTo'])) {
            return self::__myGetAll(call_user_func(array($this, $name)), $select, $this->fillable);
        }
        return null;
    }

    public static function myFindRelationships($id, $relationShips, $idRelationShips)
    {
        $oModels = self::find($id);
        if ($oModels == null) return null;
        $oModels = call_user_func(array($oModels, $relationShips));
        if(isset($oModels->Relationships['hasMany']) && in_array($relationShips, $oModels->Relationships['hasMany'])) {
            $oModels =  $oModels->where('id', $idRelationShips)->first();
        } else if(isset($oModels->Relationships['belongsTo']) && in_array($relationShips, $oModels->Relationships['belongsTo'])) {
            $oModels =  $oModels->first();
        }
        if ($oModels == null) return null;
        return $oModels;
    }

    public static function myCreateRelationships($id, $relationShips)
    {
        DB::beginTransaction();
        try {
            $param = Request()->all();
            $oModels = self::find($id);
            if ($oModels == null) return null;
            $lRelationships = $oModels->Relationships;
            $oModels = call_user_func(array($oModels, $relationShips));
            if(isset($lRelationships['hasMany']) && in_array($relationShips, $lRelationships['hasMany'])) {
                $oModels = $oModels->create($param);
            } else if(isset($lRelationships['belongsTo']) && in_array($relationShips, $lRelationships['belongsTo'])) {
                $oModels = $oModels->create($param);
            }            
            DB::commit();
            return $oModels;
            } catch (\Throwable $th) {
            throw $th;
            DB::rollback();
        }
    }

    // Metodos de relationships, creacion recusiva de elementos de ser nesesario, de querer exluirlos editar Relationships
    public static function _createBelongsTo(&$param, $oModels) 
    {
        if(isset($oModels->Relationships['belongsTo'])) {
            foreach ($oModels->Relationships['belongsTo'] as $key) {
                if (isset($param[$key])) {
                    $oModelsTemp = $oModels->RelationshipsClass[$key]::_create($param[$key]); 
                    $foringkey = self::_createNameForingkey($oModelsTemp);
                    $param[$foringkey] = $oModelsTemp[$oModelsTemp->primaryKey];
                }
            }
        }
    }
    public static function _createHasOne(&$param, $oModels) 
    {
        if(isset($oModels->Relationships['hasOne'])) {
            foreach ($oModels->Relationships['hasOne'] as $key) {
                if (isset($param[$key])) {
                    $oModelsTemp = $oModels->RelationshipsClass[$key]::_create($param[$key]); 
                    $foringkey = self::_createNameForingkey($oModelsTemp);
                    $param[$foringkey] = $oModelsTemp[$oModelsTemp->primaryKey];
                }
            }
        }
    }
    public static function _createHasMany(&$param, $oModels) 
    {
        if(isset($oModels->Relationships['hasMany'])) {
            foreach ($oModels->Relationships['hasMany'] as $key) {
                if (isset($param[$key])) {
                    foreach ($param[$key] as $oParam) {
                        if (isset($oModels->RelationshipsClass[$key])) {
                            $foringkey = self::_createNameForingkey($oModels);
                            $oParam[$foringkey] = $oModels[$oModels->primaryKey];
                            $oParam['end'] = true;
                            $oModels->RelationshipsClass[$key]::_create($oParam); 
                        }
                    }
                    //call_user_func(array($oModels, $key))->createMany($param[$key]);
                }
            }
        }
    }
    
    // Creacion de nomenglaturas de database
    public static function _createNameForingkey($oModelsTemp = null) 
    {
        if ($oModelsTemp == null) return '';
        return strtolower(class_basename($oModelsTemp).'_'.$oModelsTemp->primaryKey);
    }
    
}