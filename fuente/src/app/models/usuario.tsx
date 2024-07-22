import { IUser, } from "./user";

export interface IUsuario {
  uuid: string;
  foto: string;
  nombre: string;
  genero: string;
  direccion: string;
  telefono: string;
  correo: string;
  nacionalidad: string;
}

export class Usuario implements IUsuario {
  uuid: string;
  foto: string;
  nombre: string;
  genero: string;
  direccion: string;
  telefono: string;
  correo: string;
  nacionalidad: string;

  constructor(user: IUser) {
    this.uuid = user.login.uuid;
    this.foto = user.picture.thumbnail;
    this.nombre = `${user.name.first} ${user.name.last}`;
    this.genero = user.gender;
    this.direccion = `${user.location.street.name} ${user.location.street.number}`;
    this.telefono = user.phone;
    this.correo = user.email;
    this.nacionalidad = user.location.country;
  }
}

