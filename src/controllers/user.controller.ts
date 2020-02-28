// Aqui voy a definir
// el metodo signUp (Alta)
// el metodo signIn (Login)

// Exporto de Express las Interface de Request, Response (como lucen)
import { Request, Response } from "express";

// Aca subo un nivel y voy a models e importo todo el modulo user 
// que tiene el modelo de datos del Usuarios y su Interfce para
// Typescript
import User, { IUser } from "../models/user";

// Importo modulo jsonwebtoken para generar el Token
import jwt from "jsonwebtoken";
import config from "../config/config";

// Funcion que recibe un usuario basado en el IUser
function createToken(user: IUser) {
  // jwt tiene un metodo llamado sign que es para generar un Token
  // a este metodo le paso los campos que voy a guardar en el
  // token  en forma de objeto (id y user, el password no
  // combiene guardar), 2do parametro la clave secreta
  // que la importo del modulo config llamado config.jwtSecret
  // y el 3er parametro en forma de objeto cuando expira el token
  // expiresIn: 86400 segundos que equivale a un dia

  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    config.jwtSecret,
    { expiresIn: 86400 }
  );
}

// req: Request y res: Response son del tipo de la Interface exportada
// Exporto signUp para que pueda ser usado por el Router
// Aca hago el Signup o Alta del usuario
export const signUp =
  async (req: Request, res: Response): Promise<Response> => {
    
    if (!req.body.email) {
      console.log("req.body (Por favor Ingresa tu Email):", req.body);
      return res
        .status(400)
        .json({ msg: "Por favor Ingresa tu Email" });
    }
    else if (!req.body.password) {
      console.log("req.body (Por favor Ingresa tu Contraseña):", req.body);
      return res
        .status(400)
        .json({ msg: "Por favor Ingresa tu Contraseña" });
    }
    
    // Aca busco a ver si en el modelo Usuarios (User) el email
    // ya existe. 
    const user = await User.findOne({ email: req.body.email });
    
    // Si el usuario existe me devuelve un IUSER (interface).
    // Si no existe me devuelve undefined o null
    if (user) {
      return res
        .status(400)
        .json({ msg: "El usuario ya existe" });
    }

    // Aca genero un usuario nuevo newUser. Hago una instancias
    // del modelo User y le paso el req.body que contiene
    // los campos a guardar
    const newUser = new User(req.body);

    // Aca lo guardo dentro de MongoDB (metodo asincrono)
    await newUser.save();

    return res.status(201).json(newUser);
  };

// Exporto signIn para que pueda ser usado por el Router 
// Aqui hago el Login del Usuario ya existente
export const signIn =
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email) {
			console.log("req.body (Por favor Ingresa tu Email):", req.body);
      return res
        .status(400)
        .json({ msg: "Por favor Ingresa tu Email" });
		} else if (!req.body.password) {
			console.log("req.body (Por favor Ingresa tu Contraseña):", req.body);
      return res
        .status(400)
        .json({ msg: "Por favor Ingresa tu Contraseña" });
		}

    const user = await User.findOne({ email: req.body.email });
    
    // Si el email de usuaario No Exite
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El Usuario NO existe" });
    }

    // Si el email Existe comparo su contraseña
    const isMatch = await user.comparePassword(req.body.password);
    
    // Si la contraseña tambien es igual genero el Token
    // por medio de la funcion createToken(user)
    if (isMatch) {
      return res
        .status(200)
        .json({ token: createToken(user) });
    }

    // Si la contraseña es erronea retorno un mensaje de error
    return res
      .status(400)
      .json({ msg: "Contraseña Incorrecta" });
  };
