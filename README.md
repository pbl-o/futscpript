# Futscript

API REST conectada a una base de datos PostgreSQL evaluada vía Testing Unitario con Jest.

## Tecnologías Empleadas

- Node.js, express.js, jest

## Instalación y uso.

Instrucciones des instalación y configuración del proyecto:

1. Clonar repositorio:

```bash
git clone https://github.com/pbl-o/cafeteria-tests.git
```

2. Instalar dependencias:

```bash
npm install
```

3. completar el archivo .env.example con las propias credenciales

.env.example:

```bash
#LISTENING PORT 

API_PORT='set Api port'

#DATABASE_CREDENTIALS

DB_HOST='set a host'
DB_USER='set a username'
DB_PASS='set a password'
DB_DATABASE='set database'
DB_PORT='set a databas port'

#SECRET KEY

SECRET_KEY='set a secret key to use with jwt'

ADM_PASSWORD='set the admin password'
ADM_USERNAME='se the admin username'


```

4. Para ejecutar el test, utilizar el siguiente comando:

```bash

npm run test-exit 

```
4. Para un correcto funcionamiento de la base de datos a la hora de ejecutar los tests (sobre todo el TEST 4), se recomienda insertar equipos y profesiones:

* Ir a sript.sql y activar crear todas las tablase / insertar todos los datos.
* También se puede copiar la lista de equipos o agregar manualmente vía (API o SQL)

```SQL

INSERT INTO equipos values
(DEFAULT, 'Colo-Colo'),
(DEFAULT, 'Huachipato'),
(DEFAULT, 'UC'),
(DEFAULT, 'U');

```

5. Para experimentar las rutas via Thunderclient | Postman

- POST /Login -> insertar nombre de usario y password (.env), si las credenciales son correctas se recibirá un token de vuelta (copiar token)

- GET /equipos -> Agregar cabeceras y pegar token a continuación de Bearer: Authorization; Bearer <token> // Si las credenciales son correctas se recibe una lista con los equipos existentes.  

- POST /equipos -> Agregar cabeceras y pegar token a continuación de Bearer: Authorization; Bearer <token> // Si las credenciales son correctas se agrega un equipo a la lista con los equipos existentes.   Agregar cabeceras y pegar token a continuación de Bearer
* modelo de body => {"name": <type_string>, "password": <type_string || type_number>}

- GET /equipos/:id/jugadores -> Agregar cabeceras y pegar token a continuación de Bearer: Authorization; Bearer <token> // Si las credenciales son correctas se recibe una lista con los jugadores del equipo que corresponda al Id añadido en el request.  

- POST /equipos/:id/jugadores -> Agregar cabeceras y pegar token a continuación de Bearer: Authorization; Bearer <token> // Si las credenciales son correctas se añade un jugador a una lista de equipo que corresponda al Id añadido en el request.   
* modelo de body = {"name":<type_string>, "position":<type_number entre 1 y 4>}  

Pablo E. Díaz. A.

