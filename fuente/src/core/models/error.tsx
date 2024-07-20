import { AxiosError } from "axios";

export interface IError {
  message: string
}

export class Error implements IError {
  status: number;
  message: string;

  constructor(error: unknown = "") {
    this.status = 0;
    this.message = "";

    if (typeof error === "string") {
      this.message = error;
      return;
    }

    if (error instanceof AxiosError) {
      if (error.response === null || error.response === undefined) {
        this.message = "No se pudo completar la petición, revise la conexión de red.";
        return;
      }

      this.status = error.response.status;
      if (error.response.data.message != null || error.response.data.message != undefined) {
        this.message = error.response.data.message;
        return;
      }

      this.message = Error.obtenerErrorMsg(this.status);
      return;
    }
    
    this.message = "Ha ocurrido un error desconocido.";
  }

  private static obtenerErrorMsg(estado: number) : string {
    switch (estado) {
      case 0: return "No se pudo completar la petición, revise la conexión de red.";
      case 401: return "Su sesión ha expirado, cierre sesión y vuelva a ingresar.";
      case 403: return "Usted no tiene permiso para acceder este recurso.";
      case 404: return "El recurso al que intenta acceder no existe.";
      case 500: return "Error interno en el servidor."
      default: return `Ha ocurrido un error desconocido; Estado: ${estado}`;
    }
  }
}