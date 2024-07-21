export interface INacionalidad {
  codigoNacionalidad: string;
  nombreNacionalidad: string;
}

export class Nacionalidad implements INacionalidad {
  codigoNacionalidad: string;
  nombreNacionalidad: string;

  constructor(pCodigoNacionalidad: string, pNombreNacionalidad: string) {
    this.codigoNacionalidad = pCodigoNacionalidad;
    this.nombreNacionalidad = pNombreNacionalidad;
  }
}