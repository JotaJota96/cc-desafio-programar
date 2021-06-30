# Entorno de desarrollo en Docker

Todo el entorno de desarrollo de este proyecto se basa en Docker. A continuación se muestran los pasos para su preparación.

Configuración final:

| Recurso          | Contenedor | IP             | Puertos FW |
|------------------|------------|----------------|------------|
| Base de datos    | cc-mysql   | `192.168.24.2` | 3307:3306  |
| Backend API REST | cc-lumen   | `192.168.24.3` | 8080:80    |
| Frontend Angular | cc-angular | `192.168.24.4` | 4200:4200  |
| PHP MyAdmin      | cc-myadmin | `192.168.24.5` | 8081:80    |

## Red

Crear una red `192.168.24.0/24` para que los contenedores puedan conectarse entre ellos

```bash
docker network create --subnet=192.168.24.0/24 cc-network
```

## Base de datos MySQL

Para crear el contenedor por primera vez:

```bash
docker run \
    --name cc-mysql \
    --network cc-network \
    --ip 192.168.24.2 \
    -p 3307:3306 \
    -v "$PWD"/docker-database:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=1234 \
    -d \
    mysql:8.0
#  Si en windows no funciona intentar quitando las comillas al $PWD
```

- **Usuario:** root
- **Contraseña:** 1234

Si en otro momento el contenedor se encuentra detenido, reiniciarlo con:

```bash
docker restart cc-mysql
```

## PHP MyAdmin

Para crear el contenedor por primera vez

```bash
docker run \
    --name cc-myadmin \
    --network cc-network \
    --ip 192.168.24.5 \
    -p 8081:80 \
    --link cc-mysql:db \
    -d \
    phpmyadmin
```

Para correr un contenedor ya creado

```bash
docker restart cc-myadmin
```

- **Acceder desde:** <localhost:8081>

## Backend API Lumen

Generar la imagen `cc-lumen-img` a partir del **Dockerfile**

```bash
docker build -t cc-lumen-img:1.0-dev -f ./cc-backend/Dockerfile-dev .
# Puede que sea necesario borrar la carpeta 'docker-database', en ese caso, recordar reiniciar el contenedor de la base de datos (regenerará la carpeta)
```

Crear el contenedor a partir de la imágen

```bash
docker run \
    --name cc-lumen \
    --network cc-network \
    --ip 192.168.24.3 \
    -p 8080:80 \
    -v $PWD/cc-backend/:/app \
    -it \
    cc-lumen-img:1.0-dev bash
# salir del contenedor con: exit
```

Para acceder al contenedor si este está detenido

```bash
docker start -ai cc-lumen
```

## Frontend Angular

Generar la imagen `cc-angular-img` a partir del **Dockerfile**

```bash
docker build -t cc-angular-img:1.0-dev -f ./cc-frontend/Dockerfile-dev .
# Puede que sea necesario borrar la carpeta 'docker-database', en ese caso, recordar reiniciar el contenedor de la base de datos (regenerará la carpeta)
```

Crear el contenedor a partir de la imágen

```bash
docker run \
    --name cc-angular \
    --network cc-network \
    --ip 192.168.24.4 \
     -p 4200:4200 \
     -v "$PWD"/cc-frontend:/home/node/app \
     -it \
     cc-angular-img:1.0-dev bash
# salir del contenedor con: exit
```

Para acceder al contenedor si este está detenido

```bash
docker start -ai cc-angular
```
