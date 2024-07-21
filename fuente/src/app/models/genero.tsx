export interface IGenero {
  codigoGenero: string;
  nombreGenero: string;
}

export class Genero implements IGenero {
  codigoGenero: string;
  nombreGenero: string;

  constructor(pCodigoGenero: string, pNombreGenero : string) {
    this.codigoGenero = pCodigoGenero;
    this.nombreGenero = pNombreGenero;
  }
}