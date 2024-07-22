import React, { useState, useEffect, } from "react";
import { Error, IError, eEstado, } from "@/core/models";
import { ISmTipos, IUsuario, } from "@/app/models";
import { SettingsService, } from "@/core/services";
import { RamdomUserService, } from "@/app/services";
import { PanelBotones, } from "./panel-botones";
import { PanelFiltros, } from "./panel-filtros";
import { PanelBusqueda } from "./panel-busqueda";
import { Tabla } from "./tabla/index";
import { faLink, } from "@fortawesome/free-solid-svg-icons";
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
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(true);
  const [filtro, setFiltro] = useState<IFiltro>({
    textoBusqueda: "",
    codigoNacionalidad: "",
    codigoGenero: "",
  });
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [error, setError] = useState<IError>({ message: "" });
  
  const consultar = async () => {
    try {
      setEstado(eEstado.procesando);
      setFiltro({ ...filtro, textoBusqueda: "", })
      const settings = SettingsService.getInstance();
      const ruService = new RamdomUserService(settings.apiRandomUserBaseUrl);
      setUsuarios(await ruService.getUsuarios(filtro.codigoNacionalidad, filtro.codigoGenero));
      setEstado(eEstado.normal);
    } catch (e) {
      setError({ message: (e as Error).message, });
      setEstado(eEstado.error);
    }
  }

  useEffect(() => {
    consultar();
  }, []);

  const usuariosFiltrados = usuarios.filter((obj) =>
    (JSON.stringify(obj).toLowerCase().indexOf(filtro.textoBusqueda) !== -1)
  );

  return (
    <>
      <h3 className="mb-0">Mi tabla</h3>
      <p>
        <a
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          href="https://github.com/fsquispe/demo-upch"
          target="_blank"
        >
          <Icon icon={faLink} className="me-1" />fsquispe
        </a>
      </p>
      
      <PanelBotones
        estado={estado}
        mostrarFiltros={mostrarFiltros}
        setMostrarFiltros={(v) => setMostrarFiltros(v)}
      />

      {
        (mostrarFiltros) &&
        <PanelFiltros
          estado={estado}
          smTipos={props.smTipos}
          filtro={filtro}
          setFiltro={(v) => setFiltro(v)}
          consultar={consultar}
        />
      }
      
      <PanelBusqueda
        estado={estado}
        filtro={filtro}
        setFiltro={(v)=>setFiltro(v)}
      />

      <Tabla
        estado={estado}
        error={error}
        usuarios={usuariosFiltrados}
      />
    </>
  );
};