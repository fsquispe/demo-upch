import React, { useState, useEffect, } from "react";
import { Container } from "reactstrap";
import { Error, IError, eEstado, } from "@/core/models";
import { ISmTipos, IUser, SmTipos, } from "@/app/models";
import { SettingsService, } from "@/core/services";
import { RamdomUserService, } from "@/app/services";
import { PanelBotones, } from "./panel-botones";
import { PanelFiltros, } from "./panel-filtros";
import { PanelBusqueda } from "./panel-busqueda";
import { Tabla } from "./tabla";

import { faCheckSquare, faLink, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

interface IProps {
  smTipos: ISmTipos;
};

export interface IFiltro {
  textoBusqueda: string;
  codigoNacionalidad: string;
  codigoGenero: string;
}

export const Main : React.FC<IProps> = (props) => {
  const [estado, setEstado] = useState<eEstado>(eEstado.normal);
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);
  const [filtro, setFiltro] = useState<IFiltro>({
    textoBusqueda: "",
    codigoNacionalidad: "",
    codigoGenero: "",
  });
  const [error, setError] = useState<IError>({ message: "" });
  const [usuarios, setUsuarios] = useState<IUser[]>([]);


  const consultar = async () => {
    try {
      setEstado(eEstado.procesando);
      const settings = SettingsService.getInstance();
      const ruService = new RamdomUserService(settings.apiRandomUserBaseUrl);
      const lst = await ruService.getUsers();
      setUsuarios(await lst.results);
      setEstado(eEstado.normal);
    } catch (e) {
      setError({ message: (e as Error).message, });
      setEstado(eEstado.error);
    }
  }

  useEffect(() => {
    consultar();
  }, []);

  return (
    <>
      <h3 className="mb-0">Mi tabla</h3>
      <p>
        <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="https://github.com/fsquispe" target="_blank">
          <Icon icon={faLink} className="me-1" />fsquispe
        </a>
      </p>
      
      <PanelBotones
        mostrarFiltros={mostrarFiltros}
        setMostrarFiltros={(v) => setMostrarFiltros(v)}
      />

      {
        (mostrarFiltros) &&
        <PanelFiltros
          smTipos={props.smTipos}
          filtro={filtro}
          setFiltro={(v)=>setFiltro(v)}
        />
      }
      
      <PanelBusqueda
        filtro={filtro}
        setFiltro={(v)=>setFiltro(v)}
      />

      <Tabla
      />
    </>
  );
};