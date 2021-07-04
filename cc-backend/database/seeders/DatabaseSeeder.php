<?php

namespace Database\Seeders;

use App\Models\Empresa;
use App\Models\Localidad;
use App\Models\Persona;
use App\Models\Rubro;
use App\Models\Tipo_relacion;
use DateTime;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public $start_date = '2000-12-31 00:00:00';
    public $end_date = '2021-01-01 00:00:00';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
        DB::beginTransaction();
        $faker = Faker::create('es_UY');
        $this->rubro();
        $this->departamento();
        $this->tipo_relacion();
        $this->empresa($faker);
        $this->persona($faker);

        $this->empresa_persona($faker);
        $this->user($faker);
        DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function empresa($faker) {
        for ($i=0; $i < 400; $i++) {  
            $date = $this->randomDate();
            DB::table('empresa')->insert([
                'nro_rut' => $faker->unique()->numberBetween(111111111111,999999999999),
                'nro_bps' => $faker->unique()->numberBetween(111111,999999),
                'localidad_id' => Localidad::inRandomOrder()->first()->id,
                'rubro_principal_id' => Rubro::inRandomOrder()->first()->id,
                'rubro_secundaria_id' => Rubro::inRandomOrder()->first()->id,
                'email' => $faker->unique()->safeEmail,
                'razon_social' => $faker->company,
                'nombre_fantasia' => $faker->company,
                'direccion' => $faker->address,
                'celular' => $faker->phoneNumber,
                'telefono' => $faker->phoneNumber,
                'nro_referencia' => null,
                'fecha_inicio' => $date[0],
                'observaciones' => null,
                'logo' => null,
                'deleted_at' => $date[1],
                'created_at' => $date[2],
                'updated_at' => $date[3]
            ]);
        }
    }


    public function randomDate()
    {
        $min = strtotime($this->start_date);
        $max = strtotime($this->end_date);
        $time = rand($min, $max);
        $init = rand(1, 4);
        $update = rand(0, 1) ? rand(1, 52) : null;
        $delete = rand(0, 1) ? rand(1, 52) : null;
        $start = new DateTime(date('Y-m-d H:i:s', $time));
        return [
            $start,
            rand(0, 1) ? $start->modify('+' . $init . ' weeks') : null,
            isset($update) ? $start->modify('+' . $update . ' weeks') : null,
            isset($update) && isset($delete) ? $start->modify('+' . ($update + $delete) . ' weeks') : null
        ];
    }

    public function empresa_persona($faker) {
        for ($i=1; $i < 1000; $i++) { 
            $date = $this->randomDate();
            DB::table('empresa_persona')->insert([
                'empresa_id' => Empresa::inRandomOrder()->first()->id,
                'persona_id' => $i,
                'tipo_relacion_id' => Tipo_relacion::inRandomOrder()->first()->id,
                'deleted_at' => $date[1],
                'created_at' => $date[2],
                'updated_at' => $date[3]
            ]);
        }
    }

    public function rubro() {
        DB::table('rubro')->insert([ 'nombre' => 'Tienda' ]);
        DB::table('rubro')->insert([ 'nombre' => 'Supermercado' ]);
        DB::table('rubro')->insert([ 'nombre' => 'Joyería' ]);
        DB::table('rubro')->insert([ 'nombre' => 'Óptica' ]);
    }

    public function tipo_relacion() {
        DB::table('tipo_relacion')->insert([ 'nombre' => 'Dueño' ]);
        DB::table('tipo_relacion')->insert([ 'nombre' => 'Gerente' ]);
        DB::table('tipo_relacion')->insert([ 'nombre' => 'Empleado' ]);
        DB::table('tipo_relacion')->insert([ 'nombre' => 'Socio' ]);
    }

    public function persona($faker) {
        for ($i=0; $i < 1000; $i++) { 
            DB::table('persona')->insert([ 
                'nombre_1' => $faker->name,
                'nombre_2' => $faker->name,
                'apellide_1' => $faker->name,
                'apellide_2' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'celular' => $faker->phoneNumber,
            ]);
        }
    }

    public function user($faker) {
        $personas = Persona::inRandomOrder()->limit(300)->get();
        for ($i=0; $i < 300; $i++) { 
            $date = $this->randomDate();
            DB::table('user')->insert([ 
                'email' => $faker->unique()->safeEmail,
                'persona_id' => $personas[$i]->id,
                'rol' => 1,
                'nickname' => $faker->unique()->userName,
                'password' => Hash::make('1234'),
                'email_verified_at' => $date[0],
                'deleted_at' => $date[1],
                'created_at' => $date[2],
                'updated_at' => $date[3]
            ]);
        }
    }

    public function departamento() {
        DB::table('departamento')->insert([ 'id' => 1, 'nombre' => 'ARTIGAS' ]);
        DB::table('departamento')->insert([ 'id' => 2, 'nombre' => 'CANELONES' ]);
        DB::table('departamento')->insert([ 'id' => 3, 'nombre' => 'CERRO LARGO' ]);
        DB::table('departamento')->insert([ 'id' => 4, 'nombre' => 'COLONIA' ]);
        DB::table('departamento')->insert([ 'id' => 5, 'nombre' => 'DURAZNO' ]);
        DB::table('departamento')->insert([ 'id' => 6, 'nombre' => 'FLORIDA' ]);
        DB::table('departamento')->insert([ 'id' => 7, 'nombre' => 'LAVALLEJA' ]);
        DB::table('departamento')->insert([ 'id' => 8, 'nombre' => 'MALDONADO' ]);
        DB::table('departamento')->insert([ 'id' => 9, 'nombre' => 'PAYSANDU' ]);
        DB::table('departamento')->insert([ 'id' => 10, 'nombre' => 'RIO NEGRO' ]);
        DB::table('departamento')->insert([ 'id' => 11, 'nombre' => 'RIVERA' ]);
        DB::table('departamento')->insert([ 'id' => 12, 'nombre' => 'ROCHA' ]);
        DB::table('departamento')->insert([ 'id' => 13, 'nombre' => 'SALTO' ]);
        DB::table('departamento')->insert([ 'id' => 14, 'nombre' => 'SAN JOSE' ]);
        DB::table('departamento')->insert([ 'id' => 15, 'nombre' => 'SORIANO' ]);
        DB::table('departamento')->insert([ 'id' => 16, 'nombre' => 'TACUAREMBO' ]);
        DB::table('departamento')->insert([ 'id' => 17, 'nombre' => 'MONTEVIDEO' ]);
        DB::table('departamento')->insert([ 'id' => 18, 'nombre' => 'FLORES' ]);
        DB::table('departamento')->insert([ 'id' => 19, 'nombre' => 'TREINTA Y TRES' ]);
        
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'ARTIGAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'BELLA UNION' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'TOMAS GOMENSORO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'BALTASAR BRUM' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'BERNABE RIVERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'FRANQUIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'SEQUEIRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CORONADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CUAREIM' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CUARO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'JAVIER DE VIANA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'LAS PIEDRAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'PINTADITO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'PORT. DE HIERRO Y CAMPODONICO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'MONES QUINTELA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CAINSA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'PASO CAMPAMENTO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'PASO FARIAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'TOPADOR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CERRO EJIDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'COLONIA PALMA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CERRO SIGNORELLI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CERRO SAN EUGENIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 1, 'nombre' => 'CALNU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LAS PIEDRAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CANELONES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LA PAZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PANDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SANTA LUCIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PROGRESO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SAN RAMON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'JUAN ANTONIO ARTIGAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'FRACC. CMNO. MALDONADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'COLONIA NICOLICH' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'JOAQUIN SUAREZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PASO CARRASCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SANTA ROSA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SAUCE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'TALA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA CRESPO Y SAN ANDRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'FRACC.CNO. DEL ANDALUZ Y RUTA 84' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ATLANTIDA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ESTACION ATLANTIDA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CERRILLOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'EMPALME OLMOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'MIGUES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PARQUE DEL PLATA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SAN BAUTISTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SAN JACINTO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'DR.FRANCISCO SOCA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'TOLEDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'MONTES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SAN JOSE DE CARRASCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'FRACCIONAMIENTO SOBRE RUTA 74' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'AGUAS CORRIENTES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BARRA DE CARRASCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'JUANICO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LA FLORESTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ESTACION LA FLORESTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LAS TOSCAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PARQUE CARRASCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SALINAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SAN ANTONIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'AEROPUERTO INTERNACIONAL DE CARRASCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SOLYMAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA AEROPARQUE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CASTELLANOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BARRIO COPOLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'COSTA AZUL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'COSTA Y GUILLAMON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'EL PINAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ESTACION MIGUES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PINAMAR - PINEPARK' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LAGOMAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'OLMOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PARADA CABRERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SAN LUIS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SHANGRILA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'TOTORAL DEL SAUCE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA FELICIDAD' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LA PAZ S.A.' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA SAN JOSE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ESTACION TAPIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA SAN FELIPE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA HADITA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PASO DE PACHE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CITY GOLF' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VIEJO MOLINO SAN BERNARDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ESTANQUE DE PANDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'JARDINES DE PANDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PASO ESPINOSA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ARAMINDA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ARGENTINO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BELLO HORIZONTE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BIARRITZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BOLIVAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CAMPO MILITAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CAPILLA DE CELLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CRUZ DE LOS CAMINOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CUCHILLA ALTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'EL BOSQUE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ESTACION PEDRERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'FORTIN DE SANTA ROSA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'FRACC PROGRESO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'INSTITUTO ADVENTISTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'JAUREGUIBERRY' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BARRIO LA LUCHA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LA MONTA�ESA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LOMAS DE SOLYMAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LOS TITANES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'MARINDIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'NEPTUNIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PASO DE LA CADENA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PASO PALOMEQUE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'PIEDRA DEL TORO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'ESTACION PIEDRAS DE AFILAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'EL GALEON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SANTA ANA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SANTA LUCIA DEL ESTE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'SEIS HERMANOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA AREJO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA ARGENTINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA PORVENIR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LA TUNA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'GUAZU - VIRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'COLINAS DE SOLYMAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BARRIO REMANSO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA EL TATO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA SAN CONO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'VILLA JUANA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'COLINAS DE CARRASCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LOMAS DE CARRASCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'CARMEL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'BARRIO ASUNCION' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'QUINTAS DEL BOSQUE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'LA TAHONA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 2, 'nombre' => 'AST RUTA 6 KM 24.500' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'MELO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'FRAILE MUERTO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'RIO BRANCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'TUPAMBAE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'ISIDORO NOBLIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'ACEGUA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'BA�ADO DE MEDINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'CERRO DE LAS CUENTAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'HIPODROMO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'PLACIDO ROSAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'TOLEDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'TRES ISLAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'ARBOLITO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'AREVALO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'CASERIO LAS CA�AS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'ESPERANZA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'LA PEDRERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'LAGO MERIN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'MANGRULO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'NANDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'RAMON TRIGO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'SOTO GORO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'BARRIO LOPEZ BENITEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'BARRIO LA VINCHUCA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 3, 'nombre' => 'ARACHANIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'COLONIA DEL SACRAMENTO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'CARMELO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'JUAN LACAZE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'NUEVA HELVECIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'ROSARIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'NUEVA PALMIRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PASO ANTOLIN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'OMBUES DE LAVALLE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'TARARIRAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'COLONIA VALDENSE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'FLORENCIO SANCHEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'CONCHILLAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'LA PAZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'RIACHUELO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'AGRACIADA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'CUFRE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'EL SEMILLERO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'ESTANZUELA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'CERROS DE SAN JUAN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'MIGUELETE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PASTOREO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'CAMPANA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'ARTILLEROS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'BARKER' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'EL ENSUE�O' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'BLANCA ARENA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'BRISAS DEL PLATA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'COLONIA COSMOPOLITA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PARAJE MINUANO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'LOS PINOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'CHICO TORINO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PLAYA AZUL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PLAYA BRITOPOLIS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PLAYA PARANT' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PLAYA FOMENTO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'PUERTO INGLES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'RADIAL HERNANDEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'SANTA ANA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'SANTA REGINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'ZAGARZAZU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 4, 'nombre' => 'ARRIVILLAGA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'DURAZNOs' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'SARANDI DEL YI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'CARMEN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'BLANQUILLO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'LA PALOMA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'CARLOS REYLES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'CENTENARIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'SANTA BERNARDINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'CERRO CHATO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'BAYGORRIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'AGUAS BUENAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'PUEBLO DE ALVAREZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'FELICIANO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'OMBUES DE ORIBE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'ROSSELL Y RIUS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 5, 'nombre' => 'SAN JORGE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'FLORIDA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'SARANDI GRANDE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'CASUPA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'CARDAL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'FRAY MARCOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'VEINTICINCO DE AGOSTO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => '25 DE MAYO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'CERRO COLORADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'CAPILLA DEL SAUCE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'LA CRUZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'NICO PEREZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'CERRO CHATO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'CHAMIZO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'GO�I' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'MENDOZA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'MENDOZA CHICO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'REBOLEDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'VALENTINES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'BERRONDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'PUEBLO FERRER' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'INDEPENDENCIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'MONTECORAL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'PINTADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'POLANCO DEL YI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'PUNTAS DE MACIEL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'ILLESCAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'CASERIO LA FUNDACION' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'LA MACANA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 6, 'nombre' => 'ESTACION CAPILLA DEL SAUCE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'MINAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'JOSE BATLLE Y ORDO�EZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'JOSE PEDRO VARELA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'MARISCALA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'SOLIS DE MATAOJO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'PIRARAJA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'ZAPICAN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'COLON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'ARAMENDIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'CAMPANERO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => '19 DE JUNIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'ESTACION SOLIS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'POLANCO NORTE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'VILLA DEL ROSARIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'VILLA SERRANA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => '"BARRIO LA CORONILLA ""ANCAP"""' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 7, 'nombre' => 'ILLESCAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'MALDONADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'SAN CARLOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'AIGUA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PAN DE AZUCAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PIRIAPOLIS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PUNTA DEL ESTE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'CERRO PELADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'GARZON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'GERONA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LAS FLORES - ESTACION' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LOS TALAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'NUEVA CARRARA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'SOLIS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PINARES - LAS DELICIAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'CHIHUAHUA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'VILLA DELIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'SAN RAFAEL - EL PLACER' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'BARRIO HIPODROMO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LOS AROMOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'BELLA VISTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'CANTERAS DE MARELLI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'CERROS AZULES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'EL CHORRO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'EL EDEN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'EL TESORO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'FARO JOSE IGNACIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'GREGORIO AZNAREZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LA BARRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LA CAPUERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LAS FLORES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'MANANTIALES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'OCEAN PARK' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PLAYA GRANDE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PLAYA HERMOSA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PLAYA VERDE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PUNTA BALLENA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PUNTA COLORADA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PUNTA NEGRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'RUTA 37 Y 9 - SIERRAS DEL TIROL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'SAUCE DE PORTEZUELO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'BALNEARIO BUENOS AIRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LAS CUMBRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LOS CORCHOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'SANTA MONICA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'EDEN ROCK' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'PARQUE MEDINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'ARENAS DE JOSE IGNACIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 8, 'nombre' => 'LA SONRISA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PAYSANDU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'GUICHON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'NUEVO PAYSANDU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'QUEBRACHO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'TAMBORES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'LORENZO GEYRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'MERINOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PORVENIR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'ARBOLITO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'BEISSO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'CASABLANCA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'CERRO CHATO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'CONSTANCIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'MORATO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PIEDRAS COLORADAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PI�ERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'SAN FELIX' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'VILLA MARIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PIEDRA SOLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'BELLA VISTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'CA�ADA DEL PUEBLO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'CHAPICUY' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'EL EUCALIPTUS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'ESPERANZA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PUEBLO FEDERACION' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'LA TENTACION' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'ORGOROSO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'CHACRAS DE PAYSANDU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'GALLINAL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PUNTAS DE ARROYO NEGRO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'ESTACION PORVENIR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'CUCHILLA DE FUEGO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'PUEBLO ALONZO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 9, 'nombre' => 'QUEGUAYAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'FRAY BENTOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'YOUNG' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'NUEVO BERLIN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'SAN JAVIER' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'BARRIO ANGLO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'GRECCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'MERINOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'ALGORTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'PASO DE LOS MELLIZOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'SARANDI DE NAVARRO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'VILLA GENERAL BORGES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'VILLA MARIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'LAS CA�AS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'BELLACO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'LOS ARRAYANES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'MENAFRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 10, 'nombre' => 'TRES QUINTAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'RIVERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'MINAS DE CORRALES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'TRANQUERAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'VICHADERO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'SANTA TERESA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'ARROYO BLANCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'CERRO PELADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'PASO HOSPITAL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'LAPUENTE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'LAS FLORES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'MOIRONES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'LA PEDRERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'MANDUBI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'LAGUNON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'AMARILLO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'CERRILLADA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'CERROS DE LA CALERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'LAGOS DEL NORTE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 11, 'nombre' => 'MASOLLER' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'ROCHA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'CASTILLOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'LASCANO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'CHUY' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'CEBOLLATI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'VELAZQUEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => '18 DE JULIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'LA PALOMA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'SAN LUIS AL MEDIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'LA AGUADA Y COSTA AZUL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => '19 DE ABRIL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'LA CORONILLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'BARRIO PEREIRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'AGUAS DULCES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'BARRA DEL CHUY' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'BARRIO TORRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'CABO POLONIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'CAPACHO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'FONDO DE VALIZAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'LA ESMERALDA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'LA PEDRERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'PARALLE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'PUERTO DE LOS BOTES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'PUIMAYEN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'ARACHANIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'PUNTA RUBIA Y SANTA ISABEL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'PUNTA DEL DIABLO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'PALMARES DE LA CORONILLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 12, 'nombre' => 'LA RIBIERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'SALTO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'BELEN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'CONSTITUCION' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'FERNANDEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'SAN ANTONIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'CHACRAS DE BELEN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'ALBISU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'BIASSINI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'CAYETANO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'CUCHILLA DE GUAVIYU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'TERMAS DEL DAYMAN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'PALOMAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'SARANDI DE ARAPEY' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'SAUCEDO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'ARENITAS BLANCAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'CELESTE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'CERROS DE VERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'GARIBALDI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'TERMAS DEL ARAPEY' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'LAURELES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'COLONIA LAVALLEJA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'PUNTAS DE VALENTIN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'RINCON DE VALENTIN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'COLONIA 18 DE JULIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'PARQUE JOSE LUIS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'COLONIA ITAPEBI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'GUAVIYU DE ARAPEY' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'RUSSO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 13, 'nombre' => 'PASO CEMENTERIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'SAN JOSE DE MAYO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'LIBERTAD' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'DELTA DEL TIGRE Y VILLAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'RODRIGUEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'ITUZAINGO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'SANTA MONICA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'PUNTAS DE VALDEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'GONZALEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'MAL ABRIGO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'PLAYA PASCUAL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => '18 DE JULIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'RAFAEL PERAZZA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'RAIGON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'SAFICI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'JUAN SOLER' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'BOCAS DE CUFRE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'CAPURRO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'VILLA MARIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'ECILDA PAULLIER' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'KIYU-ORDEIG' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'LA BOYADA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'CA�ADA GRANDE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'RINCON DEL PINO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'SAN GREGORIO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'SCAVINO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'MONTE GRANDE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'CERAMICAS DEL SUR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'RADIAL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'COLOLO TINOSA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'MANGRULLO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'CARRETA  QUEMADA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 14, 'nombre' => 'COSTAS DE PEREIRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'MERCEDES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'DOLORES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'CARDONA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'JOSE ENRIQUE RODO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'PALMITAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'VILLA SORIANO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'PALMAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'EGA�A' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'SANTA CATALINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'AGRACIADA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'CASTILLOS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'RISSO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'VILLA DARWIN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'CA�ADA NIETO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'EL TALA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'LA CONCORDIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'LA LOMA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'PALO SOLO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'CHACRAS DE DOLORES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'COLONIA CONCORDIA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 15, 'nombre' => 'PERSEVERANO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'TACUAREMBO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'PASO DE LOS TOROS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'SAN GREGORIO DE POLANCO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'TAMBORES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'ACHAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'ANSINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'CURTINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'PASO DEL CERRO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'CLARA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'CUCHILLA DEL OMBU' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'LA HILERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'LAS TOSCAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'PASO BONILLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'PUEBLO DEL BARRO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'RINCON DEL BONETE' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'BALNEARIO IPORA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'PIEDRA SOLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'CARDOZO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'CHAMBERLAIN' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'CUCHILLA DE PERALTA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'LA PEDRERA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'LAURELES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'CERRO DE PASTOREO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'SAUCE DE BATOVI' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'PUNTAS DE CINCO SAUCES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 16, 'nombre' => 'RINCON DE PEREIRA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 17, 'nombre' => 'MONTEVIDEO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 17, 'nombre' => 'ABAYUBA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 17, 'nombre' => 'SANTIAGO VAZQUEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 17, 'nombre' => 'PAJAS BLANCAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 18, 'nombre' => 'TRINIDAD' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 18, 'nombre' => 'ISMAEL CORTINAS' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 18, 'nombre' => 'ANDRESITO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 18, 'nombre' => 'JUAN JOSE CASTRO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 18, 'nombre' => 'LA CASILLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 18, 'nombre' => 'CERRO COLORADO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'TREINTA Y TRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'SANTA CLARA DE OLIMAR' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'VERGARA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'ARROZAL TREINTA Y TRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'GRAL. ENRIQUE MARTINEZ' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'VILLA SARA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'CERRO CHATO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'ESTACION RINCON' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'ISLA PATRULLA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'VALENTINES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'POBLADO ALONSO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'MARIA ALBINA' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'MENDIZABAL' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'PUNTAS DE PARAO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'VILLA PASSANO' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'EJIDO DE TREINTA Y TRES' ]); 
        DB::table('localidad')->insert([ 'departamento_id' => 19, 'nombre' => 'EL BELLACO' ]); 


    }
}
