import React, { useState, useEffect, } from "react";
import { Table, Input, } from "reactstrap";
import { eEstado, IError } from "@/core/models";
import { Loader, ErrorAlert, } from "@/core/ui";
import { IUsuario, } from "@/app/models";
import { Fila, } from "./fila";
import { Paginacion, } from "./paginacion";
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
  const registrosPorPagina = 25;
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [orden, setOrden] = useState<IOrden>({
    campo: "uuid",
    ascendente: true,
  });
  
  useEffect(() => {
    setPaginaActual(1);
    setOrden({
      campo: "uuid",
      ascendente: true,
    });
    setSeleccionados([]);
  }, [props.usuarios]);

  useEffect(() => {
    setSeleccionados([]);
  }, [paginaActual]);

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
  const totalRegistros = usuariosOrdenados.length;
  const numeroPaginas = Math.trunc(totalRegistros / registrosPorPagina) + ((totalRegistros % registrosPorPagina > 0) ? 1 : 0);
  const i = (paginaActual - 1) * registrosPorPagina;
  const j = Math.min(paginaActual * registrosPorPagina, totalRegistros);
  const usuariosRender = usuariosOrdenados.slice(i,j);

  const alternarSeleccion = (uuid: string) => {
    const id = seleccionados.indexOf(uuid);
    if (id === -1) {
      setSeleccionados([...seleccionados, uuid]);
    } else {
      setSeleccionados([
        ...seleccionados.slice(0, id),
        ...seleccionados.slice(id + 1)
      ]);
    }
  };

  const esSeleccionado = (uuid: string) => {
    const id = seleccionados.indexOf(uuid);
    return (id !== -1);
  };

  const seleccionarTodo = () => {
    if (seleccionados.length === usuariosRender.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(usuariosRender.map(user => user.uuid));
    }
  }

  if (props.estado === eEstado.procesando)
    return (<Loader full type="grow" text="Consultando..." />);
  
  if (props.estado === eEstado.error) 
    return (<ErrorAlert text={props.error.message} />);

  return (
    <>
      <div className="tableFixHead">
        <Table className="align-middle text-center lh-lg shadow-sm bg-body rounded"  striped hover size="sm">
          <thead className="border-bottom border-black">
            <tr>
              <th>
                <Input
                  type="checkbox"
                  checked={(seleccionados.length === usuariosRender.length)}
                  onChange={() => seleccionarTodo()}
                />
              </th>
              <th>Foto</th>
              <th className={`clickable ${orden.campo === 'nombre' ? 'bg-info-subtle' : ''}`} onClick={() => ordenarPor("nombre")}>Nombre <Icon icon={obtenerIcono("nombre")} /></th>
              <th className={`clickable ${orden.campo === 'genero' ? 'bg-info-subtle' : ''}`} style={{ minWidth: "100px", }} onClick={() => ordenarPor("genero")}>Genero <Icon icon={obtenerIcono("genero")} /></th>
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
              usuariosRender.map((usuario, index) => (
                <Fila
                  key={index}
                  usuario={usuario}
                  seleccionado={esSeleccionado(usuario.uuid)}
                  seleccionar={() => alternarSeleccion(usuario.uuid)}
                />
              ))
            }
          </tbody>
        </Table>
      </div>

      <Paginacion
        estado={props.estado}
        registrosPorPagina={registrosPorPagina}
        totalRegistros={usuariosOrdenados.length}
        paginaActual={paginaActual}
        numeroPaginas={numeroPaginas}
        setPaginaActual={(v:number) => setPaginaActual(v)}
        seleccionados={seleccionados.length}
      />
    </>
  );
};