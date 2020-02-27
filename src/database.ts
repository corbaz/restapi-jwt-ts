// database.ts: Sirve para Conectarse a la BD.

// mongoose es un modulo de conexion no es la BD
// ConnectionOptions es la inferface para Typescript. Tambien la importo
import mongoose, { ConnectionOptions } from 'mongoose';

// importo de config.ts las variables
import config from './config/config';

// dbOptions objeto con la configuracion y es del Tipo :ConnectionOptions( Interface para Typescript y su auto completado)
const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  user: config.DB.USER,
  pass: config.DB.PASSWORD
};


mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB Connection stablished');
});

connection.on('error', (err) => {
  console.log('Mongodb connection error:', err);
  process.exit();
});