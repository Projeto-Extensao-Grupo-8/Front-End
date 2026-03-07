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
} from "./presentation/screens";
import { AgendarConsulta } from "./presentation/screens/private/paciente";   // new screen
import { Psicologo } from "./presentation/screens/private/psicologo"; // placeholder page

import BlogDetalhe from "./presentation/screens/public/blog-detalhe";
import Perfil from "./presentation/screens/private/paciente/perfil";

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
    path: "/blog",
    element: <Blog />,
  },
  {
    // 🔥 Rota dinâmica do artigo
    path: "/blog/:slug",
    element: <BlogDetalhe />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/agendar-consulta",
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