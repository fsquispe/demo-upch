import React from "react";
import { IUsuario, } from "@/app/models";

interface IProps {
  usuario: IUsuario;
};

export const Fila : React.FC<IProps> = ({ usuario, }) => {
  return (
    <tr>
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
  );
};
