import React, { useState, } from "react";
import { Table, } from "reactstrap";
import { eEstado, IError } from "@/core/models";
import { Loader, ErrorAlert, } from "@/core/ui";
import { IUser } from "@/app/models";
import { IFiltro, } from "../main";
import { faSortUp, faSortDown, } from "@fortawesome/free-solid-svg-icons";
import { faSort, } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

interface IProps {
  estado: eEstado;
  error: IError;
  usuarios: IUser[];
};

interface IOrden{
  campo: string;
  ascendente: boolean;
}

export const Tabla : React.FC<IProps> = (props) => {
  const [orden, setOrden] = useState<IOrden>({
    campo: "",
    ascendente: true,
  });


  const ordenarPor = (campo: string) => {
    setOrden(prevOrden => ({
      campo,
      ascendente: campo !== prevOrden.campo ? true : !prevOrden.ascendente
    }));
  };

  const obtenerIcono = (campo: string): IconProp => {
    return campo !== orden.campo ? faSort : orden.ascendente ? faSortUp : faSortDown;
  };
  
  if (props.estado === eEstado.procesando)
    return (<Loader full type="grow" text="Consultando..." />);
  
  if (props.estado === eEstado.error) 
    return (<ErrorAlert text={props.error.message} />);

  return (
    <Table className="align-middle text-center lh-lg shadow-sm bg-body rounded" responsive striped hover size="sm">
      <thead className="border-bottom border-black">
        <tr>
          <th></th>
          <th></th>
          <th className={`clickable ${orden.campo === 'nombre' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("nombre")}>Nombre <Icon icon={obtenerIcono("nombre")} /></th>
          <th className={`clickable ${orden.campo === 'genero' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("genero")}>Genero <Icon icon={obtenerIcono("genero")} /></th>
          <th className={`clickable ${orden.campo === 'direccion' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("direccion")}>Dirección <Icon icon={obtenerIcono("direccion")} /></th>
          <th className={`clickable ${orden.campo === 'telefono' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("telefono")}>Teléfono <Icon icon={obtenerIcono("telefono")} /></th>
          <th className={`clickable ${orden.campo === 'correo' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("correo")}>Correo electrónico <Icon icon={obtenerIcono("correo")} /></th>
          <th className={`clickable ${orden.campo === 'pais' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("pais")}>País <Icon icon={obtenerIcono("pais")} /></th>
        </tr>
      </thead>
      <tbody>
        {
          (props.usuarios.length === 0) ?
            <tr>
              <td colSpan={8} className="table-warning lh-base">
                No se encontraron resultados.
              </td>
            </tr>
          :
            props.usuarios.map((usuario, index) => (
              <tr key={index}>
                <th></th>
                <th>
                  <img src={usuario.picture.thumbnail} alt={usuario.id.name}  />
                </th>
                <td>{usuario.name.first} {usuario.name.last}</td>
                <td>{usuario.gender}</td>
                <td>{usuario.location.street.name} {usuario.location.street.number}</td>
                <td>{usuario.phone}</td>
                <td>{usuario.email}</td>
                <td>{usuario.location.country}</td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  );
};
