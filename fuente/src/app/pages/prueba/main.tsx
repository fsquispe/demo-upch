import React, { useState, useEffect, } from "react";
import { Container } from "reactstrap";
import { Error, IError, eEstado, } from "@/core/models";
import { ISmTipos, SmTipos, } from "@/app/models";
import { SettingsService, } from "@/core/services";
import { RamdomUserService, } from "@/app/services";
import { PanelBotones, } from "./panel-botones";
import { PanelFiltros, } from "./panel-filtros";
import { PanelBusqueda } from "./panel-busqueda";

import { faCheckSquare, faLink, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

interface IProps {
  smTipos: ISmTipos;
};

export interface IFiltro {
  codigoBanco: number;
  codigoCuentaBancaria: number;
  porTipoFecha: number;
}

export const Main : React.FC<IProps> = ({ smTipos }) => {
  const [estado, setEstado] = useState<eEstado>(eEstado.normal);
  const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);

  //const [depositos, setDepositos] = useState<IBancoDeposito[]>([]);
  const [error, setError] = useState<IError>({ message: "" });
  const [filtro, setFiltro] = useState<IFiltro>({
    codigoBanco: -1,
    codigoCuentaBancaria: -1,
    porTipoFecha: 1,
  });

  const consultar = async () => {
    try {
      setEstado(eEstado.procesando);
      const settings = SettingsService.getInstance();
      /*const dcService = new DepositosComService(settings.apiDepositosComBaseUrl);
      setDepositos(await dcService.postProgramarReclamo(IFiltroABancoDepositoRequest(filtro)));*/
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
      <p>
      <h3 className="mb-0">Mi tabla</h3>
      <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="https://github.com/fsquispe" target="_blank">
        <Icon icon={faLink} className="me-1" />fsquispe
      </a>
      </p>
      
      <PanelBotones
        mostrarFiltros={mostrarFiltros}
        setMostrarFiltros={(v) => setMostrarFiltros(v)}
      />

      {(mostrarFiltros) && <PanelFiltros />}
      
      <PanelBusqueda
      />

    </>
  );
};