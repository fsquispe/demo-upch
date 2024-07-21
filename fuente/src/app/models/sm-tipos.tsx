import { INacionalidad, } from "./nacionalidad";
import { IGenero, } from "./genero";

export interface ISmTipos {
  nacionalidades: INacionalidad[];
  generos: IGenero[];
}

export class SmTipos implements ISmTipos {
  nacionalidades: INacionalidad[];
  generos: IGenero[];

  constructor() {
    this.nacionalidades = [];
    this.generos = [];
  }
}