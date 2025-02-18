import { Error, } from "@/core/models";
import { BaseService } from "@/core/services";
import { ISmTipos, SmTipos, Nacionalidad, Genero, IUserResponse } from "@/app/models";
import { IUsuario, Usuario } from "../models/usuario";

export class RamdomUserService extends BaseService {

  constructor(baseURL : string) {
    super(baseURL);
  }

  /*
    Idealmente las listas de tipos deberian obtenerse del Api,
    pero al no estar disponible, simulamos con una funcion async
  */
  public async getSmTipos() : Promise<ISmTipos> {
    try {
      const smTipos = new SmTipos();
      smTipos.nacionalidades = [
        new Nacionalidad('au', 'Australia'),
        new Nacionalidad('br', 'Brasil'),
        new Nacionalidad('ca', 'Canadá'),
        new Nacionalidad('ch', 'Suiza'),
        new Nacionalidad('de', 'Alemania'),
        new Nacionalidad('dk', 'Dinamarca'),
        new Nacionalidad('es', 'España'),
        new Nacionalidad('fi', 'Finlandia'),
        new Nacionalidad('fr', 'Francia'),
        new Nacionalidad('gb', 'Reino Unido'),
        new Nacionalidad('ie', 'Irlanda'),
        new Nacionalidad('in', 'India'),
        new Nacionalidad('ir', 'Irán'),
        new Nacionalidad('mx', 'México'),
        new Nacionalidad('nl', 'Países Bajos'),
        new Nacionalidad('no', 'Noruega'),
        new Nacionalidad('nz', 'Nueva Zelanda'),
        new Nacionalidad('rs', 'Serbia'),
        new Nacionalidad('tr', 'Turquía'),
        new Nacionalidad('ua', 'Ucrania'),
        new Nacionalidad('us', 'Estados Unidos'),
      ];
      smTipos.generos = [
        new Genero('male', 'Masculino'),
        new Genero('female', 'Femenino'),
      ];

      const sleep = (ms : number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await sleep(500);
      return smTipos;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getUsuarios(codigoNacionalidad: string, codigoGenero: string) : Promise<IUsuario[]> {
    try {
      const response = await this.http.get<IUserResponse>(`/?results=500&gender=${codigoGenero}&nat=${codigoNacionalidad}`);
      return response.data.results.map(x => new Usuario(x));
    } catch (error) {
      throw new Error(error);
    }
  }


}