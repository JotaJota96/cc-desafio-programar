# Frontend

## Entorno de desarrollo

1. En la raíz del proyecto, ejecutar el comando para generar la imagen de Docker para desarrollar.

    ```bash
    docker build -t cc-angular-img:1.0-dev -f ./cc-frontend/Dockerfile-dev .
    ```

    La imágen se llamará `cc-angular-img` y tendrá el tag `1.0-dev`

2. Crear un contenedor que corra `bash` a partir de la imagen generada (primera vez)

    ```bash
    docker run --name cc-angular -p 4200:4200 -v "$PWD"/cc-frontend:/home/node/app -it cc-angular-img:1.0-dev bash
    ```

    El contenedor se llamará `cc-angular` y expondrá el puerto `4200`

    Si el contenedor ya está creado (segunda vez), entrar a el con el comando:

    ```bash
    docker start -ai cc-angular
    ```

3. Ejecutar el proyecto, dentro del contenedor ejecutar

    ```bash
    npm start
    ```

---------------------------------------------------------------------------------

## Generacion del proyecto

Estos fueron los pasos seguidos para crear el proyecto desde cero

1. En la raiz del repositorio, crear la carpeta `cc-frontend` y colocar dentro el archivo `Dockerfile-dev`.

2. En la raíz del repositorio, ejecutar el comando para generar la imagen de Docker para desarrollar

    ```bash
    docker build -t cc-angular-img:1.0-dev -f ./cc-frontend/Dockerfile-dev .
    ```

3. Correr `bash`en un contenedor a partir de la imagen generada

    ```bash
    docker run --name cc-angular -p 4200:4200 -v "$PWD"/cc-frontend:/home/node/app -it cc-angular-img:1.0-dev bash
    ```

4. Generar el proyecto Angular

    ```bash
    ng new desafio-programar --directory ./ --commit=false
    ```

5. El paso anterior generó la carpeta `.git`, como no la queremos se debe eliminar.

6. COnfigurar el proyecto para que al ejecutarlo pueda ser accedido desde el navegador. Cambiar la siguiente linea en el archivo `package.json`

    ```json
    // reemplazar
    "start": "ng serve",
    // por
    "start": "ng serve --host 0.0.0.0",
    ```

7. Ejecutar el proyecto y accederlo desde `localhost:4200`

    ```bash
    npm start
    ```

8. Finalizar la ejecución y salir del contenedor con `exit`
