import React from "react";
import { ButtonGroup, Button, } from "reactstrap";
import { eEstado, } from "@/core/models";
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

interface IProps {
  estado: eEstado;
  paginaActual: number;
  numeroPaginas: number;
  setPaginaActual: (v: number) => void;
};

export const PaginacionNavegacion : React.FC<IProps> = (props) => {
  const disabled = (props.estado === eEstado.procesando || props.estado === eEstado.iniciando || props.estado === eEstado.error)
  return (
    <ButtonGroup>
      <Button
        outline
        color="secondary"
        size="sm"
        title="Primera"
        style={{ width: "35px", }}
        disabled={(props.paginaActual === 1 || disabled)}
        onClick={() => props.setPaginaActual(1)}
      >
        <Icon icon={faAngleDoubleLeft} />
      </Button>
      <Button
        outline
        color="secondary"
        size="sm"
        title="Anterior"
        style={{ width: "35px", }}
        disabled={(props.paginaActual === 1 || disabled)}
        onClick={() => props.setPaginaActual(props.paginaActual-1)}
      >
        <Icon icon={faAngleLeft} />
      </Button>
      <Button
        outline
        color="secondary"
        size="sm"
        title="Siguiente"
        style={{ width: "35px", }}
        disabled={(props.paginaActual === props.numeroPaginas || props.numeroPaginas === 0 || disabled)}
        onClick={() => props.setPaginaActual(props.paginaActual+1)}
      >
        <Icon icon={faAngleRight} />
      </Button>
      <Button
        outline
        color="secondary"
        size="sm"
        title="Última"
        style={{ width: "35px", }}
        disabled={(props.paginaActual === props.numeroPaginas || props.numeroPaginas === 0 || disabled)}
        onClick={() => props.setPaginaActual(props.numeroPaginas)}
      >
        <Icon icon={faAngleDoubleRight} />
      </Button>
    </ButtonGroup>
  );
};