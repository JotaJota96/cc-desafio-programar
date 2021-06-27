<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;
use Illuminate\Database\Eloquent\SoftDeletes;

class Departamento extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'departamento';
  protected $fillable = [
      'id',
      'nombre',
      'created_at',
      'updated_at'
  ];
  static public $rules = array(
    'get' => array(
      'id' => 'numeric',
      'nombre' => 'max:255',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'post' => array(
      'nombre' => 'max:255|required'
    ),
    'put' => array(
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
    $validator = Validator::make( $data->all(), Departamento::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ 'localidad'],
    'belongsTo' => [ ],
    'belongsToMany' => [ ]
  ];
  
  protected $RelationshipsClass = [
    'localidad' => 'App\Models\Localidad'
  ];

  //Relationships
  public function localidad() 
  { 
    return $this->hasMany('App\Models\Localidad'); 
  }
  
}
