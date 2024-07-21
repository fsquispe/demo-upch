import React from 'react';
import { Row, Col, Input} from "reactstrap";
import { ButtonX, InputSelectFilter, } from "@/core/ui";
import { eEstado, } from "@/core/models";
import { ISmTipos, } from "@/app/models";
import { IFiltro, } from "./main";
import { faEdit, faRefresh, faSliders, faTrash, } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  estado: eEstado,
  smTipos: ISmTipos;
  filtro: IFiltro;
  setFiltro: (v: IFiltro) => void;
  consultar: () => void;
};

export const PanelFiltros : React.FC<IProps> = (props) => {
  return (
    <div className="pt-3 px-3 mb-3 shadow-sm rounded bg-body-secondary">
      <Row >
        <Col className="mb-3" lg={3} md={5} sm={12}>
          <InputSelectFilter
            keyFieldName="codigoNacionalidad" 
            textFieldName="nombreNacionalidad" 
            title="Nacionalidad"
            lst={[{codigoNacionalidad: "", nombreNacionalidad: "[Todos]"}].concat(props.smTipos.nacionalidades)}
            value={props.filtro.codigoNacionalidad}
            setValue={(v) => props.setFiltro({ ...props.filtro, codigoNacionalidad: v, })}
            visibleFilter
          />
        </Col>
        <Col className="mb-3" lg={3} md={4} sm={12}>
          <InputSelectFilter
            keyFieldName="codigoGenero" 
            textFieldName="nombreGenero" 
            title="Genero"
            lst={[{codigoGenero: "", nombreGenero: "[Todos]"}].concat(props.smTipos.generos)}
            value={props.filtro.codigoGenero}
            setValue={(v) => props.setFiltro({ ...props.filtro, codigoGenero: v, })}
          />
        </Col>
        <Col className="mb-3" lg={2} md={3} sm={12}>
          <ButtonX
            block
            disabled={(props.estado === eEstado.procesando)}
            className="me-2"
            color="primary"
            icon={faRefresh}
            text="Consultar"
            onClick={() => props.consultar()}
          />
        </Col>
      </Row>
    </div>

  );
};