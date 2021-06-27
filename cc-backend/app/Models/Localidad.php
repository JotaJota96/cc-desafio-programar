<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;

use App\Models\Departamento as Departamento;
use Illuminate\Database\Eloquent\SoftDeletes;

class Localidad extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'localidad';
  protected $fillable = [
      'id',
      'departamento_id',
      'nombre',
      'created_at',
      'updated_at'
  ];
  static public $rules = array(
    'get' => array(
      'id' => 'numeric',
      'departamento_id' => 'numeric|exists:departamento,id',
      'nombre' => 'max:255',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'post' => array(
      'departamento_id' => 'numeric|required|exists:departamento,id',
      'nombre' => 'max:255|required',
    ),
    'put' => array(
      'departamento_id' => 'numeric|required|exists:departamento,id',
      'nombre' => 'max:255|required'
    ),
    'delete' => array(
      'id' => 'numeric|required'
    )
  );

  protected $casts = array(
      'created_at' => 'datetime:Y-m-d H i s',
      'updated_at' => 'datetime:Y-m-d H i s'
  );
  


  static public $messages = array(
    
  );
  
  static public function validate($data, $rule_type)
  {
    $validator = Validator::make( $data->all(), Localidad::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ 'empresa'],
    'belongsTo' => [ 'departamento'],
    'belongsToMany' => [ ]
  ];
  
  protected $RelationshipsClass = [
    'departamento' => 'App\Models\Departamento',
    'empresa' => 'App\Models\Empresa'
  ];

  //Relationships
  public function empresa() 
  { 
    return $this->hasMany('App\Models\Empresa'); 
  }
  public function departamento() { 
    return $this->belongsTo('App\Models\Departamento'); 
  }
  
}
