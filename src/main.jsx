import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Login,
  Cadastro,
  Home,
  Blog,
  AdminHome,
  DashboardHub,
  EsqueciMinhaSenha,
} from "./presentation/screens";
import { AgendarConsulta } from "./presentation/screens/private/paciente";
import { Psicologo } from "./presentation/screens/private/psicologo";

import BlogDetalhe from "./presentation/screens/public/blog-detalhe";
import Perfil from "./presentation/screens/private/paciente/perfil";
import { ClientTemplate } from "./presentation/atomic/template";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/esqueci-minha-senha",
    element: <EsqueciMinhaSenha />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/paciente/blog",
    element: <Blog Template={ClientTemplate} />,
  },
  {
  
    path: "/blog/:slug",
    element: <BlogDetalhe />,
  },
  {
    path: "/paciente/perfil",
    element: <Perfil />,
  },
  {
    path: "/paciente/agendar-consulta",
    element: <AgendarConsulta />,
  },
  {
    path: "/psicologo",
    element: <Psicologo />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "/admin/dashboard",
    element: <DashboardHub />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);