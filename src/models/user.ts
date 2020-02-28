// Aca van a estar las definiciones de Modelos de Datos de los Usuario
// Osea los datos que voy a guardar en la BD

// Importo solo del Modelo mongoose (esta vez no para la conexion sino
// para la definicion del Schema) las siguiente modulos
// model, Schema, Document
import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Defino y exporto una Interface de Typescript para tener 
// el autocompletado y saber que datos necesito y puedo usar
// cuando lo defino debo extenderlo del modulo extends Document
// para que Herede las propiedades y metodos del Document y
// declaro las 2 email y password y
// tambien declaro los metodos (function) que tiene
// comparePassword() donde le paso una password
// y me devuelve en base a una Promesa un Boleano

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<Boolean>
};

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Metodo para CIFRAR
// Cada vez que se guarde un dato previamente se va a ejecutar esta funcion
userSchema.pre<IUser>("save", async function (next) {
  // el metodo pre() esta basado en <IUser> en la interface de Typescript
  // se usa function ES5 para no perder el scope .this y poder hacer uso 
  // del Schema userSchema, luego lo igualo a una const user que es igual
  // a .this esta funcion tiene de parametro next que es un callback
  const user = this;

  // Aca verifico si el campo password fue modificado y si no lo fue
  // salgo con return next();
  if (!user.isModified("password")) return next();

  // Si el usuario es nuevo o modifica su password
  // Uso el modulo bcrypt lo importo arriba
  // Uso el metodo genSalt(10) eso ejecuta 10 veces el algoritmo
  // y genera una strign que nos va a ayudar a cifrar el dato
  const salt = await bcrypt.genSalt(10);

  // Generamos con el metodo hash en base a password y salt
  // la contraseña cifrada
  const hash = await bcrypt.hash(user.password, salt);

  // Esta es la password cifrada
  user.password = hash;

  next();
});

// Metodo para COMPARAR si la contraseña pasada es igual a la guardada
// comparo si el parametro pasado password es igual a this.password
// Aca voy a crear un Metodo comparePassword
// Voy a return una Promesa<Boolean> de Typescript 
// del Tipo Boleano True o False
userSchema.methods.comparePassword =
  async function (password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  };

// como voy a utilizarlo en otras partes exporto el model
// se le un nombre "User" y un Schema(userSchema)
// model esta basadso en la Interface IUser de Typescript
export default model<IUser>("User", userSchema);
