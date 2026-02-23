import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Login, Cadastro, Home, DashboardHub} from "./presentation/screens";
import Perfil from "./presentation/screens/private/paciente/perfil";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/login", element: <Login/> },
  { path: "/perfil", element: <Perfil/> },
  { path: "/dashboard", element: <DashboardHub/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
