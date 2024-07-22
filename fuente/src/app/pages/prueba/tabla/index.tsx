import React, { useState, } from "react";
import { Table, } from "reactstrap";
import { eEstado, IError } from "@/core/models";
import { Loader, ErrorAlert, } from "@/core/ui";
import { IUsuario, } from "@/app/models";
import { IFiltro, } from "../main";
import { faSortUp, faSortDown, } from "@fortawesome/free-solid-svg-icons";
import { faSort, } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

interface IProps {
  estado: eEstado;
  error: IError;
  usuarios: IUsuario[];
};

interface IOrden{
  campo: keyof IUsuario;
  ascendente: boolean;
}

export const Tabla : React.FC<IProps> = (props) => {
  const [orden, setOrden] = useState<IOrden>({
    campo: "uuid",
    ascendente: true,
  });


  const ordenarPor = (campo: keyof IUsuario) => {
    setOrden(prevOrden => ({
      campo,
      ascendente: campo !== prevOrden.campo ? true : !prevOrden.ascendente
    }));
  };

  const obtenerIcono = (campo: string): IconProp => {
    return campo !== orden.campo ? faSort : orden.ascendente ? faSortUp : faSortDown;
  };

  function sortArray<T>(array: T[], key: keyof T): T[] {
    return array.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
  
      if (valueA < valueB) {
        return orden.ascendente ? -1 : 1;
      }
      if (valueA > valueB) {
        return orden.ascendente ? 1 : -1;
      }
      return 0;
    });
  }

  const usuariosOrdenados = sortArray(props.usuarios, orden.campo);
  
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
          <th className={`clickable ${orden.campo === 'nacionalidad' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("nacionalidad")}>País <Icon icon={obtenerIcono("nacionalidad")} /></th>
        </tr>
      </thead>
      <tbody>
        {
          (usuariosOrdenados.length === 0) ?
            <tr>
              <td colSpan={8} className="table-warning lh-base">
                No se encontraron resultados.
              </td>
            </tr>
          :
          usuariosOrdenados.map((usuario, index) => (
            <tr key={index}>
              <th></th>
              <th>
                <img src={usuario.foto} alt={usuario.uuid}  />
              </th>
              <td>{usuario.nombre}</td>
              <td>{usuario.genero}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.nacionalidad}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};
