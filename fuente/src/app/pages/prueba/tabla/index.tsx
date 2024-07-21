import React from "react";
import { Table, } from "reactstrap";
import { eEstado, IError } from "@/core/models";
import { Loader, ErrorAlert, } from "@/core/ui";
import { IUser } from "@/app/models";
import { IFiltro, } from "../main";

interface IProps {
  estado: eEstado;
  error: IError;
  usuarios: IUser[];
};

export const Tabla : React.FC<IProps> = (props) => {

  if (props.estado === eEstado.procesando)
    return (<Loader full type="grow" text="Consultando..." />);
  
  if (props.estado === eEstado.error) 
    return (<ErrorAlert text={props.error.message} />);

  return (
    <Table className="align-middle text-center lh-base shadow-sm bg-body rounded" responsive bordered striped hover size="sm">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Nombre</th>
          <th>Genero</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Correo electrónico</th>
          <th>País</th>
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
