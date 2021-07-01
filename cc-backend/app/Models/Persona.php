<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;
use Illuminate\Database\Eloquent\SoftDeletes;

class Persona extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'persona';
  protected $fillable = [
      'id',
      'email',
      'nombre_1',
      'nombre_2',
      'apellide_1',
      'apellide_2',
      'celular',
      'deleted_at',
      'created_at',
      'updated_at'
  ];
  protected $hidden = [
      'deleted_at',
      'created_at',
      'updated_at'
  ];
  static public $rules = array(
    'get' => array(
      'id' => 'numeric',
      'email' => 'max:255|email',
      'nombre_1' => 'max:255',
      'nombre_2' => 'max:255',
      'apellide_1' => 'max:255',
      'apellide_2' => 'max:255',
      'celular' => 'max:255',
      'deleted_at' => 'date',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'post' => array(
      'email' => 'max:255|email',
      'nombre_1' => 'max:255',
      'nombre_2' => 'max:255',
      'apellide_1' => 'max:255',
      'apellide_2' => 'max:255',
      'celular' => 'max:255',
    ),
    'put' => array(
      'email' => 'max:255|email',
      'nombre_1' => 'max:255',
      'nombre_2' => 'max:255',
      'apellide_1' => 'max:255',
      'apellide_2' => 'max:255',
      'celular' => 'max:255'
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
    $validator = Validator::make( $data->all(), Persona::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ 'empresa_persona', 'user'],
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
  public function user() 
  { 
    return $this->hasMany('App\Models\User'); 
  }
  
}
