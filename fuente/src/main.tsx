import "bootstrap/dist/css/bootstrap.css";
import "@/assets/css/base.css";
import React, { useState, useEffect, } from "react";
import ReactDOM from "react-dom/client";
import { SettingsService, } from "@/core/services";
import { Loader, } from "@/core/ui";
import {  eEstado, } from "@/core/models";
import { AppRoutes, } from "@/routes";

declare const DEBUG: boolean;
declare const API_RANDOMUSER_BASE_URL: string;

export const App : React.FC = () => {
  const [estado, setEstado] = useState<eEstado>(eEstado.iniciando);

  useEffect(() => {
    const inicializar = async () => {
      const settings = SettingsService.getInstance();
      settings.debug = DEBUG;
      settings.publicPath = "/";
      settings.appBaseUrl = window.location.origin;
      settings.apiRandomUserBaseUrl = API_RANDOMUSER_BASE_URL;
      setEstado(eEstado.finalizado);
    };

    inicializar();
  }, []);

  if (estado === eEstado.iniciando)
    return (<Loader full type="grow" text="Iniciando..." />);

  return (<AppRoutes />);
};

const app = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);