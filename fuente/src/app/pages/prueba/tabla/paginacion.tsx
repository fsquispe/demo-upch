import React from "react";
import { Row, Col, Badge, } from "reactstrap";
import { eEstado, } from "@/core/models";
import { PaginacionNavegacion, }  from "./paginacion-navegacion";

interface IProps {
  estado: eEstado;
  registrosPorPagina: number;
  totalRegistros: number;
  paginaActual: number;
  numeroPaginas: number;
  setPaginaActual: (v: number) => void;
};

export const Paginacion : React.FC<IProps> = (props) => {

  if (props.totalRegistros === 0) {
    return null
  }

  return (
    <Row className="mt-3">
      <Col className="col-auto">
        <Badge color="primary">#Registros: {props.totalRegistros}</Badge>
      </Col>
      <Col></Col>
      <Col className="col-auto">
        <Badge color="primary">#Página: {props.paginaActual} de {props.numeroPaginas}</Badge>
      </Col>
      <Col className="col-auto">
        <PaginacionNavegacion
          estado={props.estado}
          numeroPaginas={props.numeroPaginas}
          paginaActual={props.paginaActual}
          setPaginaActual={props.setPaginaActual}
        />
      </Col>
    </Row>
  );
};