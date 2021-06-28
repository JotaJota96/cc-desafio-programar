<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rubro extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'rubro';

  protected $fillable = [
      'id',
      'nombre',
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
      'nombre' => 'max:255',
      'deleted_at' => 'date',
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
      'deleted_at' => 'datetime:Y-m-d H:i:s',
      'created_at' => 'datetime:Y-m-d H:i:s',
      'updated_at' => 'datetime:Y-m-d H:i:s'
  );
  


  static public $messages = array(
    
  );
  
  static public function validate($data, $rule_type)
  {
    $validator = Validator::make( $data->all(), Rubro::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ 'empresa', 'empresa'],
    'belongsTo' => [ ],
    'belongsToMany' => [ ]
  ];
  
  protected $RelationshipsClass = [
    'empresa' => 'App\Models\Empresa'
  ];

  //Relationships
  public function empresa() 
  { 
    return $this->hasMany('App\Models\Empresa'); 
  }
  
}
