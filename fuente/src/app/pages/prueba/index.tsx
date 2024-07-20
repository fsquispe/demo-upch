import React, { useState, useEffect, } from "react";
import { SettingsService, } from "@/core/services";
import { Loader, ErrorAlert, } from "@/core/ui";
import { Error, IError, eEstado, } from "@/core/models";
import { Container } from "reactstrap";

export const Prueba : React.FC = () => {
  const [estado, setEstado] = useState<eEstado>(eEstado.iniciando);
  const [error, setError] = useState<IError>({ message: "", });

  useEffect(() => {
    const obtenerSmTipos = async () => {
      
    };

    obtenerSmTipos();
  }, []);

  if (estado === eEstado.iniciando)
    return (<Loader full type="grow" text="Consultando..." />);

  if (estado === eEstado.error)
    return (<Container className="mt-3"><ErrorAlert reload text={error.message} /></Container>);

  return (
    <Container>
      <div>hola</div>
    </Container>
  );
};