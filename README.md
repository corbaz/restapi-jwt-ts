# Typescript REST API JWT

this is a REST API example using Nodejs, Mongodb, Typescript and JsonWebtoken with Passport.

## Requeriments

* Mongodb
* Nodejs/npm

### DEPENDENCIA

* "express": "^4.17.1"
* Framework de Node.js.Servidor que me permite recibir peticiones http y responder.

* "mongoose": "^5.9.2"
* Modulo que me permite conectar y modelar una BD

* "morgan": "^1.9.1"
* Modulo que me permite ver la peticiones que llegan por Consola: Get, Post, Put, Delete y Patch

* "bcrypt": "^4.0.0"
* Modulo que me permite cifrar los datos

* "jsonwebtoken": "^8.5.1" o JWT
* Modulo Estandar que nos permite intercambiar tokens entre el Servidor y el Navegador. Sirve para saber si el Usuario esta Autenticado o no.

* "passport": "^0.4.1"
* Modulo de Autenticacion tiene varios metodos para autenticar. Podemos autenticar con Redes Sociales, con nuestra propia BD. Vamos a usar JWT json web token.

* "passport-jwt": "^4.0.0"
* Metodo a utilazar jsonwebtoken o JWT

* "cors": "^2.8.5"
* Modulo de nos permite comunicarnos con 2 servidores

### DEV-DEPENDENCIAS

* "typescript": "^3.8.2"
* Lenguaje compilador de javascript

* "tsc-watch": "^4.1.0"
* Modulo nos permite ejecutar un commando luego de haber compilado el codigo. Ejecutamos el codigo compilado con Node. Se ejecuta por si solo solo.

* Instalar @types de Typescript (Complementos o descripciones de los modulos)

  "@types/bcrypt": "^3.0.0",
  "@types/cors": "^2.8.6",
  "@types/express": "^4.17.2",
  "@types/jsonwebtoken": "^8.3.7",
  "@types/mongoose": "^5.7.1",
  "@types/morgan": "^1.7.37",
  "@types/passport": "^1.0.2",
  "@types/passport-jwt": "^3.0.3"

### Archivos de configuracion

* package.json Configuracion del proyecto vamos
* generado (npm init -y)

* tsconfig.json Configuracion de como vamos a compilar el codigo de Typescript.
* generado (tsc --init)

* index.ts:     Sirve para arrancar toda la Aplicacion
* app.js:       Sirve para CREAR el Servidor
* database.ts:  Sirve para Conectarse a la BD.

### Carpetas del Proyecto

* Directorio / o Root
* archivos de Configuracion

* Directorio /src
* Carpeta de los archivos principales

* Directorio /config
* Carpeta para las configuraciones de Modulos x Ej passport y otro

* Directorio /controller
* Carpeta para las funciones que van a manejar las Rutas cuando lleguen las peticiones

* Directorio /middlewares
* Carpeta para los Middlewares personalizados

* Directorio /models
* Carpeta para definir los modelos de datos que vamos a guardar dentro de MongoDB para ello vamos a utilzar Mongoose.

* Directorio /routers
* Carpeta para definir URL o RUTAS que va tener nuestro Servidor. Para eso vamos a usar el Enrutador de Express
