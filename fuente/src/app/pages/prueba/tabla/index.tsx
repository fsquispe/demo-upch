import React, { useState, } from "react";
import { Table, } from "reactstrap";
import { eEstado, IError } from "@/core/models";
import { Loader, ErrorAlert, } from "@/core/ui";
import { IUsuario, } from "@/app/models";
import { Fila, } from "./fila";
import { faSortUp, faSortDown, faSort, } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import "./tabla.css";

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

  function ordernar<T>(array: T[], key: keyof T): T[] {
    return array.sort((a, b) => {
      const valorA = a[key];
      const valorB = b[key];
  
      if (valorA < valorB) {
        return orden.ascendente ? -1 : 1;
      }
      if (valorA > valorB) {
        return orden.ascendente ? 1 : -1;
      }
      return 0;
    });
  }

  const usuariosOrdenados = ordernar(props.usuarios, orden.campo);
  
  if (props.estado === eEstado.procesando)
    return (<Loader full type="grow" text="Consultando..." />);
  
  if (props.estado === eEstado.error) 
    return (<ErrorAlert text={props.error.message} />);

  return (
    <div className="tableFixHead">
      <Table className="align-middle text-center lh-lg shadow-sm bg-body rounded"  striped hover size="sm">
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
              <Fila key={index} usuario={usuario} />
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};
