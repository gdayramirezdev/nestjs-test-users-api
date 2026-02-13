# Users API Test

API para crear usuarios, consumir API Ghibli por role de usuarios, authenticar usuarios, poder editarlos y consumirlos.

Es importante tener el archivo con las variables de entorno correctas,
sobre todo con DB_HOST=postgres para produccion o DB_HOST=localhost para ambiente local.

## Ejecutar el proyecto con Docker Compose

### Requisitos

Antes de comenzar asegúrate de tener instalado:

- Docker >= 24
- Docker Compose >= 2.x

Verifica con:

```bash
docker -v
docker compose version
```

Crear archivo .env en la raíz del proyecto, ejemplo:

```env
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=usersdb
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1h
```

Construir y levantar los contenedores

```bash
docker compose up --build
```

## Ejecutar el proyecto en ambiente local

### Requisitos

Tener instalado postgresql o bien lanzar un contenedor docker

```bash
docker run -d --name postgres-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=usersdb -p 5432:5432 postgres:15
```

Crear archivo .env en la raíz del proyecto, ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=usersdb
JWT_SECRET=supersecret
JWT_EXPIRES_IN=1h
```

Para poder lanzar el proyecto en entorno local
```bash
npm install
npm run start:dev
```


