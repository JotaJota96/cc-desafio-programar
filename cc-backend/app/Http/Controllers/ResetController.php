<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\modelos\producto as Producto;
use App\modelos\notas as Notas;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Webp;
use Illuminate\Support\Str;


use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\File as File;



class ResetController extends Controller
{
    public $modales = [
        'user' => 'App\Models\user',
        'departamento' => 'App\Models\departamento',
        'tipo_relacion' => 'App\Models\tipo_relacion',
        'rubro' => 'App\Models\rubro',
        'persona' => 'App\Models\persona',
        'localidad' => 'App\Models\localidad',
        'empresa' => 'App\Models\empresa',
        'empresa_persona' => 'App\Models\empresa_persona',
    ];
    public $error = [
        'not_model' => 'No se encuentra la tabla'
    ];

    public function model($variable = null)
    {
        if ($variable == null) return array_keys($this->modales);
        if (!isset($this->modales[$variable])) return [ "error" => $this->error["not_model"] ];
        return new $this->modales[$variable];
    }

    function respond($status, $data = [])
    {
        return response()->json($data, $status);
    }

    public function info(Request $request)
    {
        $info = [];
        foreach ($this->model() as $key => $value) {
            $info[] = [
                [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/init'
                ], [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/export'
                ], [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/estruct'
                ], [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/estruct/put'
                ], [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/estruct/post'
                ], [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/estruct/get'
                ], [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/'
                ], [
                    "metodo" => "get", 
                    "url" => '/reset/'.$key.'/{id}'
                ], [
                    "metodo" => "delete", 
                    "url" => '/reset/'.$key.'/{id}'
                ], [
                    "metodo" => "put", 
                    "url" => '/reset/'.$key.'/{id}'
                ], [
                    "metodo" => "post", 
                    "url" => '/reset/'.$key.'/'
                ]
            ];
        }
        return $this->respond(Response::HTTP_OK,  $info );
    }

    /**
     * @queryNameParam:string Parametro de busqueda es q por defecto en caso de ser diferente setear en el model base
     * @incluidRelationships:boolean Parametro de para solicitar dataos completos es full por defecto en caso de ser diferente setear en el model base
     * @Relationships:Array Listado de relaciones que se deceen editar en la recursividad de creacion y solicirudes de ser diferente setear en el model base
     * _createNameForingkey():string Funcion a reescribir de ser nesesaria
     */
    public function post(Request $request, $model)
    {
        try {
            $model = $this->model($model);
            if ($model == null) return response("No se encontro", 404);
            if (isset($model['error'])) return response($model['error'], 404);
            $params = $request->all();
            $error = $model::validate($request, 'post');
            if (isset($error)) return response($error, 404);
            if ($model->update) {
                for ($i=0; $i < sizeof($model->update); $i++) {
                    if ($request->file($model->update[$i]['name'])) {
                        $picName = uniqid() . '_' . date("Ymd") . ".";
                        $path = $model->update[$i]['folder'];
                        File::makeDirectory($path, 0777, true, true);
                        $request->file($model->update[$i]['name'])->move($path, $picName . $request->file($model->update[$i]['name'])->guessClientExtension());
                        $params[$model->update[$i]['name']] = $path . "/" . $picName . $request->file($model->update[$i]['name'])->guessClientExtension();
                        if ($model->update[$i]['webp']) {
                            $data = file_get_contents($params[$model->update[$i]['name']]);
                            $im = imagecreatefromstring($data);
                            if ($im !== false) {
                                $ruta = $model->update[$i]['folder'] . "/" . $picName . ".webp";
                                $webp = imagewebp($im, $ruta);
                                $params[$model->update[$i]['name'] . "_webp"] = $ruta; 
                                imagedestroy($im);
                            }
                        }
                    }
                }
            }
            $model = $model::_create($params);
            return response($model, 200);
        } catch (\Throwable $th) {
            return response($th, 500);
        }
    }

    public function put(Request $request, $model, $id)
    {
        if (!isset($id) || !is_numeric($id)) return response("Identificador no valido", 404);
        $model = $this->model($model);
        if (!isset($model) == null) return response("No se encontro", 404);
        if (isset($model['error'])) return response($model['error'], 404);
        $model = $model->find($id);
        if ($model == null) return response("No se encontro", 404);
        $params = $request->all();
        $error = $model::validate($request, 'put');
        if (isset($error)) return response($error, 404);
        if ($model->update) {
            for ($i=0; $i < sizeof($model->update); $i++) {
                if ($request->file($model->update[$i]['name'])) {
                    $picName = uniqid() . '_' . date("Ymd") . "." . $request->file($model->update[$i]['name'])->guessClientExtension();
                    $path = "public/".$model->update[$i]['folder'];
                    File::makeDirectory($path, 0777, true, true);
                    $request->file($model->update[$i]['name'])->move($path, $picName);
                    $params[$model->update[$i]['name']] = $path . "/". $picName;
                    if ($model->update[$i]['webp']) {
                        $data = file_get_contents($params[$model->update[$i]['name']]);
                        $im = imagecreatefromstring($data);
                        if ($im !== false) {
                            $ruta = "public/".$model->update[$i]['folder']."/".Str::random(20).".webp";
                            $webp = imagewebp($im, $ruta);
                            $params[$model->update[$i]['name']."_webp"] = "public/".$ruta; 
                            imagedestroy($im);
                        }
                    }
                }
            }
        }
        $model->update($params);
        return response($model->toArray(), 200);
    }

    public function get(Request $request, $model, $id)
    {
        if (!isset($id) || !is_numeric($id)) return response("Identificador no valido", 404);
        $model = $this->model($model);
        if ($model == null) return response("No se encontro", 404);
        $error = $model::validate($request, 'get');
        if (isset($error)) return response($error, 404);
        if (isset($model['error'])) return response($model['error'], 404);
        else return response($model::customGet($id), 200);
    }

    public function delete(Request $request, $model, $id)
    {
        if (!isset($id) || !is_numeric($id)) return response("Identificador no valido", 404);
        $model = $this->model($model);
        if ($model == null) return response("No se encontro", 404);
        if (isset($model['error'])) return response($model['error'], 404);
        $error = $model::validate($request, 'delete');
        if (isset($error)) return response($error, 404);
        $Objeto = $model->find($id);
        if ($Objeto == null) return response("No se encontro", 404);
        else return response($Objeto->delete() ? 1: 0, 200);

    }

    public function gets(Request $request, $model)
    {
        $model = $this->model($model);
        if ($model == null) return response("No se encontro", 404);
        $error = $model::validate($request, 'get');
        if (isset($error)) return response($error, 404);
        if (isset($model['error'])) return response($model['error'], 404);
        return response($model::customGet(), 200);
    }

    public function caunt(Request $request, $model)
    {
        $model = $this->model($model);
        if ($model == null) return response("No se encontro", 404);
        if (isset($model['error'])) return response($model['error'], 404);
        return response($model::_caunt(), 200);
    }

    public function export(Request $request, $model)
    {
        $model_name = $model;
        if ($model == null) return response("No se encontro", 404);
        $model = $this->model($model_name);
        if (isset($model['error'])) return response($model['error'], 404);
        
        $csvData = $model::all()->toArray();
        $fillable = $model->_fillable();
        if ($fillable == null) return response("No se encontro", 404);
        $csv = fopen($model_name.'.csv', 'w');
        fputcsv($csv, $fillable, ",");
        foreach ($csvData as $row){
            fputcsv($csv, array_values($row), ",");
        }
        fclose($csv);
        $data = file_get_contents($model.'.csv');
        return response($data)
        ->withHeaders([
            'Content-Type' => 'text/plain',
            'Cache-Control' => 'no-store, no-cache',
            'Content-Disposition' => 'attachment; filename="'.$model_name.'.csv',
        ]);
    }
    
}
