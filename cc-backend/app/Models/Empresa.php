<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;

use App\Models\Localidad as Localidad;
use App\Models\Rubro as Rubro;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresa extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'empresa';
  protected $fillable = [
      'id',
      'nro_rut',
      'nro_bps',
      'localidad_id',
      'rubro_principal_id',
      'rubro_secundaria_id',
      'email',
      'razon_social',
      'nombre_fantasia',
      'direccion',
      'celular',
      'telefono',
      'nro_referencia',
      'fecha_inicio',
      'observaciones',
      'logo',
      'deleted_at',
      'created_at',
      'updated_at'
  ];
  protected $hidden = [
      'deleted_at',
      'updated_at'
  ];
  static public $rules = array(
    'get' => array(
      'id' => 'numeric',
      'nro_rut' => 'max:255|unique:empresa',
      'nro_bps' => 'max:255|unique:empresa',
      'localidad_id' => 'numeric|exists:localidad,id',
      'rubro_principal_id' => 'numeric|exists:rubro,id',
      'rubro_secundaria_id' => 'numeric|exists:rubro,id',
      'email' => 'max:255|email',
      'razon_social' => 'max:255',
      'nombre_fantasia' => 'max:255',
      'direccion' => 'max:255',
      'celular' => 'max:255',
      'telefono' => 'max:255',
      'nro_referencia' => 'max:255',
      'observaciones' => 'max:4294967295',
      'logo' => 'max:255',
      'deleted_at' => 'date',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'post' => array(
      'nro_rut' => 'max:255|required|unique:empresa',
      'nro_bps' => 'max:255|required|unique:empresa',
      'localidad_id' => 'numeric|exists:localidad,id',
      'rubro_principal_id' => 'required|numeric|exists:rubro,id',
      'rubro_secundaria_id' => 'numeric|exists:rubro,id',
      'email' => 'max:255|email',
      'razon_social' => 'max:255|required',
      'nombre_fantasia' => 'max:255|required',
      'direccion' => 'max:255|required',
      'celular' => 'max:255',
      'telefono' => 'max:255',
      'nro_referencia' => 'max:255',
      'observaciones' => 'max:4294967295',
      'logo' => 'max:255',
    ),
    'put' => array(
      'nro_rut' => 'max:255|required|unique:empresa',
      'nro_bps' => 'max:255|required|unique:empresa',
      'localidad_id' => 'numeric|exists:localidad,id',
      'rubro_principal_id' => 'required|numeric|exists:rubro,id',
      'rubro_secundaria_id' => 'numeric|exists:rubro,id',
      'email' => 'max:255|email',
      'razon_social' => 'max:255|required',
      'nombre_fantasia' => 'max:255|required',
      'direccion' => 'max:255|required',
      'celular' => 'max:255',
      'telefono' => 'max:255',
      'nro_referencia' => 'max:255',
      'observaciones' => 'max:4294967295',
      'logo' => 'max:255'
    ),
    'delete' => array(
      'id' => 'numeric|required'
    )
  );

  protected $casts = array(
      'deleted_at' => 'datetime:Y-m-d H:i:s',
      'created_at' => 'datetime:Y-m-d H:i:s',
      'updated_at' => 'datetime:Y-m-d H:i:s'
  );
  


  static public $messages = array(
    
  );
  
  static public function validate($data, $rule_type)
  {
    $validator = Validator::make( $data->all(), Empresa::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ 'empresa_persona'],
    'belongsTo' => [ 'localidad', 'rubro', 'rubro_secundaria'],
    'belongsToMany' => [ ]
  ];
  
  protected $RelationshipsClass = [
    'localidad' => 'App\Models\Localidad',
    'rubro' => 'App\Models\Rubro',
  ];

  //Relationships
  public function empresa_persona() 
  { 
    return $this->hasMany('App\Models\Empresa_persona', 'empresa_id', 'id'); 
  }
  public function localidad() { 
    return $this->belongsTo('App\Models\Localidad'); 
  }
  public function rubro() { 
    return $this->belongsTo('App\Models\Rubro', 'rubro_principal_id'); 
  }
  public function rubro_secundaria() { 
    return $this->belongsTo('App\Models\Rubro', 'rubro_secundaria_id'); 
  }
  
}
