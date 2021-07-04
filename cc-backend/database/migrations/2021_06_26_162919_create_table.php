<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('departamento', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->SoftDeletes();
            $table->timestamps();
        });

        Schema::create('tipo_relacion', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->SoftDeletes();
            $table->timestamps();
        });
        
        Schema::create('rubro', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->SoftDeletes();	
            $table->timestamps();
        });

        Schema::create('persona', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre_1')->nullable();
            $table->string('nombre_2')->nullable();
            $table->string('apellide_1')->nullable();
            $table->string('apellide_2')->nullable();
            $table->string('celular')->nullable();
            $table->string('email')->nullable();
            $table->SoftDeletes();	
            $table->timestamps();
        });

        Schema::create('localidad', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->unsignedBigInteger('departamento_id')->nullable();
            $table->foreign('departamento_id')->references('id')->on('departamento');
            $table->SoftDeletes();
            $table->timestamps();
        });
        
        Schema::create('user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('rol')->default(1);
            $table->string('nickname');
            $table->string('password')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->string('token')->unique()->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('persona_id')->nullable();
            $table->foreign('persona_id')->references('id')->on('persona');
            $table->SoftDeletes();
        });

        Schema::create('empresa', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('razon_social'); 
            $table->string('nombre_fantasia');
            $table->string('nro_rut')->unique();
            $table->unsignedBigInteger('localidad_id')->nullable();
            $table->foreign('localidad_id')->references('id')->on('localidad');
            $table->string('direccion');
            $table->string('email')->nullable();
            $table->string('celular')->nullable();
            $table->string('telefono')->nullable();
            $table->string('nro_bps')->unique();
            $table->string('nro_referencia')->nullable();
            $table->unsignedBigInteger('rubro_principal_id');
            $table->unsignedBigInteger('rubro_secundaria_id')->nullable();
            $table->foreign('rubro_principal_id')->references('id')->on('rubro');
            $table->foreign('rubro_secundaria_id')->references('id')->on('rubro');
            $table->date('fecha_inicio')->nullable();
            $table->longText('observaciones')->nullable();
            $table->longText('logo')->nullable();
            $table->SoftDeletes();	
            $table->timestamps();
        });

        Schema::create('empresa_persona', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->foreign('empresa_id')->references('id')->on('empresa');
            $table->unsignedBigInteger('persona_id')->nullable();
            $table->foreign('persona_id')->references('id')->on('persona');
            $table->unsignedBigInteger('tipo_relacion_id')->nullable();
            $table->foreign('tipo_relacion_id')->references('id')->on('tipo_relacion');
            $table->SoftDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('departamento');
        Schema::dropIfExists('tipo_relacion');
        Schema::dropIfExists('rubro');
        Schema::dropIfExists('persona');
        Schema::dropIfExists('localidad');
        Schema::dropIfExists('user');
        Schema::dropIfExists('empresa');
        Schema::dropIfExists('empresa_persona');
    }
}
