import React from 'react';
import { Row, Col, Input} from "reactstrap";
import { ButtonX, InputSelectFilter, } from "@/core/ui";
import { eEstado, } from "@/core/models";
import { ISmTipos, } from "@/app/models";
import { IFiltro, } from "./main";
import { faEdit, faSliders, faTrash, } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  smTipos: ISmTipos;
  filtro: IFiltro;
  setFiltro: (v: IFiltro) => void;
};

export const PanelFiltros : React.FC<IProps> = (props) => {
  return (
    <Row className="p-3 mx-0 mb-3 shadow-sm rounded bg-body-secondary">
      <Col md={4} sm={12}>
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
      <Col md={4} sm={12}>
        <InputSelectFilter
          keyFieldName="codigoGenero" 
          textFieldName="nombreGenero" 
          title="Genero"
          lst={[{codigoGenero: "", nombreGenero: "[Todos]"}].concat(props.smTipos.generos)}
          value={props.filtro.codigoGenero}
          setValue={(v) => props.setFiltro({ ...props.filtro, codigoGenero: v, })}
        />
      </Col>
      <Col md={4} sm={12}>
      {props.filtro.codigoNacionalidad}{' '}{props.filtro.codigoGenero}
      </Col>
    </Row>
  );
};