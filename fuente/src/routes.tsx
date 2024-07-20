import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { SettingsService, } from "@/core/services";
import { Prueba, } from "@/app/pages";

export const AppRoutes : React.FC = () => {
  const settings : SettingsService = SettingsService.getInstance();
  return(
    <BrowserRouter basename={settings.publicPath}>
      <Routes>
        <Route path="/" element={<Prueba />} />
        <Route path="*" element={<h2>Not Found</h2>}/>
      </Routes>
    </BrowserRouter>
  );
};