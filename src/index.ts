// index.ts: Sirve para arrancar toda la Aplicacion

// importo el archvo app
import app from './app'
import './database';

// Le digo al Servidor que escuche el port definido en el archivo app
app.listen(app.get('port'));
console.log(`Server on port: http://localhost:${app.get('port')}`);