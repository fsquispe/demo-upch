import React, { forwardRef, } from "react";
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText, Label, Input, } from "reactstrap";
import { ButtonX, } from "@/core/ui";
import { eEstado } from "@/core/models";
import { faEdit, faSliders, faTrash, } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  estado: eEstado;
  mostrarFiltros: boolean;
  setMostrarFiltros: (v: boolean) => void;
};

export const PanelBotones : React.FC<IProps> = (props) => {
  return (
    <Row>
      <Col className="mb-3">
        <ButtonX
          outline
          active={props.mostrarFiltros}
          className="me-2"
          disabled={(props.estado === eEstado.procesando)}
          color="primary"
          icon={faSliders}
          text="Filtros"
          onClick={()=>props.setMostrarFiltros(!props.mostrarFiltros)}
        />
        <ButtonX
          outline
          disabled={(props.estado === eEstado.procesando)}
          className="me-2"
          color="warning"
          icon={faEdit}
          text="Editar"
          //onClick={()=>consultar()}
        />
        <ButtonX
          outline
          disabled={(props.estado === eEstado.procesando)}
          color="danger"
          icon={faTrash}
          text="Eliminar"
          //onClick={()=>consultar()}
        />
      </Col>
    </Row>
  );
};