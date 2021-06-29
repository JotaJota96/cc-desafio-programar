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

/*
|--------------------------------------------------------------------------
| Acceso
|--------------------------------------------------------------------------
*/
$router->get('/access/login', 'AuthenticationController@login');
$router->get('/access/hash', 'AuthenticationController@password_hash');
$router->get('/access/password/iniciar_reset', 'AuthenticationController@send_reset_password');
$router->post('/access/password/reset', 'AuthenticationController@reset_password');
$router->group(['middleware' => 'CustomAuthenticate'], function () use ($router) {
/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/
/**
 * Listado de roubros principal y secundarioa con cantidad de empresas agregadas
 */
$router->get('/dashboard/rubro', 'DashboardController@lista_rubro');

/**
 * Listado de roubros principal con cantidad de empresas agregadas
 */
$router->get('/dashboard/rubro/principal', 'DashboardController@lista_rubro_principal');

/**
 * Listado de roubros secundarioa con cantidad de empresas agregadas
 */
$router->get('/dashboard/rubro/secundaria', 'DashboardController@lista_rubro_secundaria');

/**
 * Listado de empresas del roubros principal
 */
$router->get('/dashboard/rubro/principal/{id}', 'DashboardController@lista_rubro_principal_empresa');

/**
 * Listado de empresas del roubros secundarioa
 */
$router->get('/dashboard/rubro/secundaria/{id}', 'DashboardController@lista_rubro_secundaria_empresa');

/**
 * Listado de empresas del roubros principal y secundarioa
 */
$router->get('/dashboard/rubro/{id}', 'DashboardController@lista_rubro_empresa');


/**
 * Listado de empresas del roubros principal y secundarioa
 */
$router->get('/dashboard/aniversario/{month}', 'DashboardController@lista_aniversario_empresa');

/**
 * Listado de empresas que ingresaron y salida en un mes y un año valido, de no pasarse se toma el actual
 * @year(numero) de 1000 a año actual
 * @month(numero) de 1 a 12
 */
$router->get('/dashboard/movimintos', 'DashboardController@lista_movimintos');

/**
 * Listado de empresas que ingresaron en un mes y un año valido, de no pasarse se toma el actual
 * @year(numero) de 1000 a año actual
 * @month(numero) de 1 a 12
 */
$router->get('/dashboard/movimintos/altas', 'DashboardController@lista_movimintos_alta');

/**
 * Listado de empresas que salida en un mes y un año valido, de no pasarse se toma el actual
 * @year(numero) de 1000 a año actual
 * @month(numero) de 1 a 12
 */
$router->get('/dashboard/movimintos/bajas', 'DashboardController@lista_movimintos_baja');

/**
 * Listado de localidad con cantidad de empresas agregadas 
 * convinado con listado de departamentos con cantidad de empresas agregadas
 * @Param departamento No importa el valor solo dara el listado de departamentos
 * /dashboard/localidad?departamento
 * @Param localidad No importa el valor solo dara el listado de localidad
 * /dashboard/localidad?localidad
 */
$router->get('/dashboard/localidad', 'DashboardController@lista_localidad');

/**
 * Listado de empresas de una localidad espesifica
 */
$router->get('/dashboard/localidad/{id}', 'DashboardController@lista_localidad_empresa');

/**
 * Listado de empresas de un departamento
 */
$router->get('/dashboard/departamento/{id}/empresa', 'DashboardController@lista_departamento_empresa');

/**
 * Listado de localidad de un departamento con cantidad de empresas agregadas
 */
$router->get('/dashboard/departamento/{id}', 'DashboardController@lista_localidad_departamento');

/**
 * Listado de departamentos con cantidad de empresas agregadas
 */
$router->get('/dashboard/departamento', 'DashboardController@lista_departamento');


/*
|--------------------------------------------------------------------------
| ApiRest
|--------------------------------------------------------------------------
*/
/**
 * Crea un archivo csv con el listado completo del elemento
 */
$router->get('/{model}/export', 'ResetController@export');

/**
 * Igual que el select pero retorna la cantidad de eleementos
 */
$router->get('/{model}/caunt', 'ResetController@caunt');
/**
 * Retorna el elemento en concreto seleccionado
 */
$router->get('/{model}/{id}', 'ResetController@get');
/**
 * Retorna un elemento de paginacion
 * @Param page(numero) determina la pagina actual
 * @Param q(string) texto por el que se filtraran los atributos
 * @Param full(0|1) determina si enviar atributos secundarios del elemento
 * @Param strict_where(0|1) por defecto 1, determina si atributos de filtro seran estrictos 
 * ejempl: 
 *      /empresa?localidad_id=23&strict_where=0 podra retornara localidad_id: 23 como localidad_id: 623
 *      /empresa?localidad_id=23&strict_where=1 solo retornara localidad_id: 23
 * @Param fillable attibutos, estos se filtaran por medio de un like de no ser exacto
 */
$router->get('/{model}', 'ResetController@gets');
$router->delete('/{model}/{id}', 'ResetController@delete');
$router->put('/{model}/{id}', 'ResetController@put');
$router->post('/{model}/', 'ResetController@post');
});
