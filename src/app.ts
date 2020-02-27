// app.js: Sirve para CREAR el Servidor

import express from 'express'
import passport from 'passport'
import passportMiddleware from './middlewares/passport';
import cors from 'cors';
import morgan from 'morgan';

// Importo todo el archivo './routes/auth.routes'
import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));

// Nuetro servidor va a ser capaz de comunicarse con otros tipos de servidores de desarrollo
app.use(cors());

// Como es una Restapi para recibir y enviar Datos en formato JSON
// hay que utilizar un metodo de Express llamado "urlencoded" y "json"
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
passport.use(passportMiddleware);

// routes
app.get('/', (req, res) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`);
});

// app usa el enrutador authRoutes para que la app tenga autenticacion
app.use(authRoutes);

app.use(specialRoutes);


// Exporto la configuracion del Servidor. 
// Porque Aqui no voy a Inicializarlo
// Se va inicializar en index.ts
export default app;
