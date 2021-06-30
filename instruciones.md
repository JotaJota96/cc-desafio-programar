# Instrucciones para desarrollar

Para seguir estos pasos perimero se deben haber preparado los contenedores docker como se explica en [este documento](./documentacion/entorno-de-desarrollo.md).

1. Iniciar el contenedor de la base de datos (ejecuta en segundo plano)

    ```bash
    docker restart cc-mysql
    ```

2. Iniciar el contenedor de **phpMyAdmin** (ejecuta en segundo plano)

    ```bash
    docker restart cc-myadmin
    ```

    Acceder desde <localhost:8081> y crear la base de datos `centro_comercial`

3. En una nueva terminal, ingresar al contenedor de la API REST

    ```bash
    docker start -ai cc-lumen
    ```

    Dentro del contenedor se pueden ejecutar los siguientes comandos según que se quiera hacer:

    ```bash
    # instalar dependencias
    composer install

    # Archivo de configuracion
    cp .env.dev.example .env

    # Crear la estructura de la base de datos y cargar datos de prueba
    php artisan migrate
    php artisan db:seed

    # Iniciar el servidor de desarrollo local
    php -S 0.0.0.0:80 -t public
    ```

    La API quedará expuesta en <localhost:8080>

4. En una nueva terminal, ingresar al contenedor de la API REST

    ```bash
    docker start -ai cc-angular
    ```

    Dentro del contenedor se pueden ejecutar los siguientes comandos según que se quiera hacer:

    ```bash
    # instalar dependencias
    npm install
    
    # Iniciar el servidor de desarrollo local
    npm start
    ```

    La aplicación quedará expuesta en <localhost:4200>
