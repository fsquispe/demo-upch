import React from "react";
import { Table, } from "reactstrap";
import { eEstado } from "@/core/models";
import { InputBuscar } from "@/core/ui";
import { IFiltro, } from "./main";

export const Tabla : React.FC = () => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            First Name
          </th>
          <th>
            Last Name
          </th>
          <th>
            Username
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            1
          </th>
          <td>
            Mark
          </td>
          <td>
            Otto
          </td>
          <td>
            @mdo
          </td>
        </tr>
        <tr>
          <th scope="row">
            2
          </th>
          <td>
            Jacob
          </td>
          <td>
            Thornton
          </td>
          <td>
            @fat
          </td>
        </tr>
        <tr>
          <th scope="row">
            3
          </th>
          <td>
            Larry
          </td>
          <td>
            the Bird
          </td>
          <td>
            @twitter
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
