import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppointmentsProvider, ConsultationProvider, PatientProvider, PsychologistProvider } from "./data";

import {
  Login,
  Cadastro,
  Home,
  Blog,
  AdminHome,
  DashboardHub,
  EsqueciMinhaSenha,
  AdminStock,
  AdminEmployee,
} from "./presentation/screens";
import { AgendarConsulta } from "./presentation/screens/private/paciente";
import { PsicologoPacientes, PsicologoAgenda, PsicologoPerfil } from "./presentation/screens/private/psicologo";

import BlogDetalhe from "./presentation/screens/public/blog-detalhe";
import Perfil from "./presentation/screens/private/paciente/perfil";
import { ClientTemplate, PsicologoTemplate } from "./presentation/atomic/template";

import "./index.css";
import { StockMovementProvider } from "./data/StockMovement/StockMovementProvider";

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
    path: "/psicologo/blog",
    element: <Blog Template={PsicologoTemplate} />,
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
    path: "/psicologo/agenda",
    element: <PsicologoAgenda />,
  },
  {
    path: "/psicologo/pacientes",
    element: <PsicologoPacientes />,
  },
  {
    path: "/psicologo/perfil",
    element: <PsicologoPerfil />,
  },
  {
    path: "/administrador",
    element: <AdminHome />,
  },
  {
    path: "/administrador/dashboard",
    element: <DashboardHub />,
  },
  {
    path: "/administrador/estoque",
    element: <AdminStock/>,
  },
  {
    path: "/administrador/funcionarios",
    element: <AdminEmployee/>,
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StockMovementProvider>
        <AppointmentsProvider>
          <PatientProvider>
            <ConsultationProvider>
              <PsychologistProvider>
                <RouterProvider router={router}/>
              </PsychologistProvider>
            </ConsultationProvider>
          </PatientProvider>
        </AppointmentsProvider>
      </StockMovementProvider>
    </QueryClientProvider>
  </StrictMode>
);