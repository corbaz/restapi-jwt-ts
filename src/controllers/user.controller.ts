// Aqui voy a definir
// el metodo signUp (Alta)
// el metodo signIn (Login)

// Exporto de Express las Interface de Request, Response (como lucen)
import { Request, Response } from "express";

import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign(
    { id: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: 86400 }
  );
}

// req: Request y res: Response son del tipo de la Interface exportada
// Exporto signUp para que pueda ser usado por el Router
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
    
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ msg: "El usuario ya existe" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  };

// Exporto signIn para que pueda ser usado por el Router  
export const signIn =
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res
				.status(400)
				.json({ msg: "Por favor. Envía tu Email y Contraseña" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El Usuario NO existe" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res
        .status(400)
        .json({ token: createToken(user) });
    }

    return res
      .status(400)
      .json({ msg: "Email o Contraseña Incorrecta" });
  };
