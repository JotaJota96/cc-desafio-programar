<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Validator;
use \Crypt;
use App\Traits\ModelsCustom;

use App\Models\Persona as Persona;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
  use SoftDeletes;
  use ModelsCustom;

  protected $table = 'user';

  protected $fillable = [
    'id',
    'email',
    'token',
    'persona_id',
    'rol',
    'nickname',
    'password',
    'email_verified_at',
    'expires_at',
    'created_at',
    'updated_at'
  ];
  protected $hidden = [
      'token',
      'password',
      'email_verified_at',
      'expires_at',
      'created_at',
      'updated_at'
  ];
    

  static public $rules = array(
    'get' => array(
      'id' => 'numeric',
      'email' => 'max:255|email|unique:user',
      'token' => 'max:255|unique:user',
      'persona_id' => 'numeric|exists:persona,id',
      'rol' => 'numeric',
      'nickname' => 'max:255',
      'email_verified_at' => 'date',
      'expires_at' => 'date',
      'created_at' => 'date',
      'updated_at' => 'date'
    ),
    'post' => array(
      'email' => 'max:255|email|required|unique:user',
      'token' => 'max:255|unique:user',
      'persona_id' => 'numeric|exists:persona,id',
      'rol' => 'numeric',
      'nickname' => 'max:255|required',
      'password' => 'min:6|max:255|required'
    ),
    'put' => array(
      'email' => 'max:255|email|required|unique:user',
      'token' => 'max:255|unique:user',
      'persona_id' => 'numeric|exists:persona,id',
      'rol' => 'numeric',
      'nickname' => 'max:255|required',
      'password' => 'max:255'
    ),
    'delete' => array(
      'id' => 'numeric|required'
    )
  );

  protected $casts = array(
      'email_verified_at' => 'datetime:Y-m-d H:i:s',
      'expires_at' => 'datetime:Y-m-d H:i:s',
      'created_at' => 'datetime:Y-m-d H:i:s',
      'updated_at' => 'datetime:Y-m-d H:i:s'
  );
  
  static public function validate($data, $rule_type)
  {
    $validator = Validator::make( $data->all(), User::$rules[$rule_type] );
    if($validator->fails()){
      return $validator->messages()->toArray();
    }
  }

  protected $Relationships = [
    'hasMany' => [ ],
    'belongsTo' => [ 'persona'],
    'belongsToMany' => [ ]
  ];
  
  //Relationships
  public function persona() { 
    return $this->belongsTo('App\Models\Persona'); 
  }
  
}
