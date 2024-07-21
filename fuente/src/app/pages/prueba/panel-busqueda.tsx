import React from "react";
import { Row, Col, } from "reactstrap";
import { eEstado } from "@/core/models";
import { InputBuscar } from "@/core/ui";
import { IFiltro, } from "./main";

interface IProps {
  filtro: IFiltro;
  setFiltro: (v: IFiltro) => void;
};

export const PanelBusqueda : React.FC<IProps> = (props) => {
  return (
    <Row className="mb-3">
      <Col lg={4} md={6} sm={12}>
        <InputBuscar
          //disabled={(estado === eEstado.procesando || estado === eEstado.error)}
          value={props.filtro.textoBusqueda}
          setValue={(v) => props.setFiltro({ ...props.filtro, textoBusqueda: v, })}
        />
      </Col>
    </Row>
  );
};
