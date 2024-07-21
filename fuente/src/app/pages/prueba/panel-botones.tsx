import React, { forwardRef, } from "react";
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText, Label, Input, } from "reactstrap";
import { ButtonX, } from "@/core/ui";
import { eEstado } from "@/core/models";
import { faEdit, faSliders, faTrash, } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  mostrarFiltros: boolean,
  setMostrarFiltros: (v: boolean) => void,
};

export const PanelBotones : React.FC<IProps> = ({ mostrarFiltros, setMostrarFiltros, }) => {
  return (
    <Row>
      <Col className="mb-3">
        <ButtonX
          outline
          active={mostrarFiltros}
          className="me-2"
          //disabled={(estado === eEstado.procesando)}
          color="primary"
          icon={faSliders}
          text="Filtros"
          onClick={()=>setMostrarFiltros(!mostrarFiltros)}
        />
        <ButtonX
          outline
          //active
          //disabled={(estado === eEstado.procesando)}
          className="me-2"
          color="warning"
          icon={faEdit}
          text="Editar"
          //onClick={()=>consultar()}
        />
        <ButtonX
          outline
          //active
          //disabled={(estado === eEstado.procesando)}
          color="danger"
          icon={faTrash}
          text="Eliminar"
          //onClick={()=>consultar()}
        />
      </Col>
    </Row>
  );
};