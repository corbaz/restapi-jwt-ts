// Rutas de Autenticacion

// Importamos el Metodo Router solamente de Express. 
// Ya no Express entero como para crear un Servidor
// Creo un Enrutador para definir las Rutas o URL 
import { Router } from 'express'

// Exporto los metodos signIn y signUp de '../controllers/user.controller'
import { signIn, signUp } from '../controllers/user.controller'

const router = Router();

// Ruta para Usuarios Nuevos - Registro
// signUp es un metodo definido en ../controllers/user.controller
router.post('/signup', signUp);

// Ruta para Loguearse a Usuarios existentes en la BD
// signIn es un metodo definido en ../controllers/user.controller
router.post('/signin', signIn);

// Exporto el Enrutador para ser Usado
export default router;