import React from "react";
import { Input, } from "reactstrap";
import { IUsuario, } from "@/app/models";

interface IProps {
  usuario: IUsuario;
  seleccionado: boolean;
  seleccionar: () => void;
};

export const Fila : React.FC<IProps> = (props) => {
  return (
    <tr
      className={(props.seleccionado) ? "table-success" : ""}
      onClick={() => props.seleccionar()}
    >
      <th>
        <Input
          type="checkbox"
          checked={props.seleccionado}
          onChange={() => props.seleccionar()}
        />
      </th>
      <th>
        <img src={props.usuario.foto} alt={props.usuario.uuid}  />
      </th>
      <td>{props.usuario.nombre}</td>
      <td>{props.usuario.genero}</td>
      <td>{props.usuario.direccion}</td>
      <td>{props.usuario.telefono}</td>
      <td>{props.usuario.correo}</td>
      <td>{props.usuario.nacionalidad}</td>
    </tr>
  );
};
