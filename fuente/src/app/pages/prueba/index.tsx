import React, { useState, useEffect, } from "react";
import { Container } from "reactstrap";
import { SettingsService, } from "@/core/services";
import { Loader, ErrorAlert, } from "@/core/ui";
import { IError, eEstado, } from "@/core/models";
import { ISmTipos, SmTipos, } from "@/app/models";
import { RamdomUserService, } from "@/app/services";
import { Main, } from "./main";
import clearbitImg from "@/assets/img/clearbit.png";

export const Prueba : React.FC = () => {
  const [smTipos, setSmTipos] = useState<ISmTipos>(new SmTipos());
  const [estado, setEstado] = useState<eEstado>(eEstado.iniciando);
  const [error, setError] = useState<IError>({ message: "", });

  useEffect(() => {
    const obtenerSmTipos = async () => {
      try {
        const settings = SettingsService.getInstance();
        const ruService = new RamdomUserService(settings.apiRandomUserBaseUrl);
        setSmTipos(await ruService.getSmTipos());
        setEstado(eEstado.finalizado);
      } catch (e) {
        setError({ message: (e as Error).message, });
        setEstado(eEstado.error);
      }
    };

    obtenerSmTipos();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="#">
            <img src={clearbitImg} alt="Logo de la empresa" className="d-inline-block align-text-top" height="30" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <Container className="mt-4">
        {
          (estado === eEstado.iniciando) ?
            <Loader full type="grow" text="Iniciando..." />
          : (estado === eEstado.error) ?
            <ErrorAlert reload text={error.message} />
          :
            <Main smTipos={smTipos} />
        }
      </Container>
    </>
  );
};