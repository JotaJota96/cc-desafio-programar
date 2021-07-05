<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;

use App\Models\Empresa as Empresa;
use App\Models\Persona as Persona;
use App\Models\Tipo_relacion as Tipo_relacion;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresa_persona extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'empresa_persona';
  protected $fillable = [
      'id',
      'empresa_id',
      'persona_id',
      'tipo_relacion_id',
      'deleted_at',
      'created_at',
      'updated_at'
  ];
  protected $hidden = [
      'deleted_at',
      'created_at',
      'updated_at'
  ];
  protected $with = ['empresa', 'persona', 'tipo_relacion'];
  static public $rules = array(
    'get' => array(
      'id' => 'numeric',
      'empresa_id' => 'numeric|exists:empresa,id',
      'persona_id' => 'numeric|exists:persona,id',
      'tipo_relacion_id' => 'numeric|exists:tipo_relacion,id',
      'deleted_at' => 'date',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'post' => array(
      'empresa_id' => 'numeric|exists:empresa,id',
      'persona_id' => 'numeric|exists:persona,id',
      'tipo_relacion_id' => 'numeric|exists:tipo_relacion,id',
    ),
    'put' => array(
      'empresa_id' => 'numeric|exists:empresa,id',
      'persona_id' => 'numeric|exists:persona,id',
      'tipo_relacion_id' => 'numeric|exists:tipo_relacion,id',
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
    $validator = Validator::make( $data->all(), Empresa_persona::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ ],
    'belongsTo' => [ 'empresa', 'persona', 'tipo_relacion'],
    'belongsToMany' => [ ]
  ];
  
  protected $RelationshipsClass = [
    'empresa' => 'App\Models\Empresa',
    'persona' => 'App\Models\Persona',
    'tipo_relacion' => 'App\Models\Tipo_relacion'
  ];

  //Relationships
  public function empresa() { 
    return $this->belongsTo('App\Models\Empresa'); 
  }
  public function persona() { 
    return $this->belongsTo('App\Models\Persona'); 
  }
  public function tipo_relacion() { 
    return $this->belongsTo('App\Models\Tipo_relacion'); 
  }
  
}
