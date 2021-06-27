<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tipo_relacion extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'tipo_relacion';

  protected $fillable = [
      'id',
      'nombre',
      'deleted_at',
      'created_at',
      'updated_at'
  ];

  static public $rules = array(
    'get' => array(
      'id' => 'numeric',
      'nombre' => 'max:255',
      'deleted_at' => 'date',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'post' => array(
      'nombre' => 'max:255|required',
      'deleted_at' => 'date',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'put' => array(
      'nombre' => 'max:255|required'
    ),
    'delete' => array(
      'id' => 'numeric'
    )
  );

  protected $casts = array(
      'deleted_at' => 'datetime:Y-m-d H i s',
      'created_at' => 'datetime:Y-m-d H i s',
      'updated_at' => 'datetime:Y-m-d H i s'
  );
  


  static public $messages = array(
    
  );
  
  static public function validate($data, $rule_type)
  {
    $validator = Validator::make( $data->all(), Tipo_relacion::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ 'empresa_persona'],
    'belongsTo' => [ ],
    'belongsToMany' => [ ]
  ];
  
  protected $RelationshipsClass = [
    'empresa_persona' => 'App\Models\Empresa_persona'
  ];

  //Relationships
  public function empresa_persona() 
  { 
    return $this->hasMany('App\Models\Empresa_persona'); 
  }
  
}
