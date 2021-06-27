<?php
use App\Http\Controllers\ResetController;

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Dashboard
$router->get('/dashboard/rubro', 'DashboardController@lista_rubro');
$router->get('/dashboard/rubro/principal', 'DashboardController@lista_rubro_principal');
$router->get('/dashboard/rubro/secundaria', 'DashboardController@lista_rubro_secundaria');
$router->get('/dashboard/localidad', 'DashboardController@lista_localidad');

// ApiRest
$router->get('/{model}/export', 'ResetController@export');
$router->get('/{model}/caunt', 'ResetController@caunt');
$router->get('/{model}/{id}', 'ResetController@get');
$router->get('/{model}', 'ResetController@gets');
$router->delete('/{model}/{id}', 'ResetController@delete');
$router->put('/{model}/{id}', 'ResetController@put');
$router->post('/{model}/', 'ResetController@post');
