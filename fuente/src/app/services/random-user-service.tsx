import { Error, } from "@/core/models";
import { BaseService } from "@/core/services";
import { ISmTipos, SmTipos, Nacionalidad, Genero, IUserResponse } from "@/app/models";

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
        //new Genero('genderqueer', 'Género no binario o queer'),
      ];

      const sleep = (ms : number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await sleep(1000);
      return smTipos;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getUsers() : Promise<IUserResponse> {
    try {
      const response = await this.http.get<IUserResponse>(`/?results=50`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }


}