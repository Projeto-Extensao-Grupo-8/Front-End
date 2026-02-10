import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Login, Cadastro, DashboardHub} from "./presentation/screens";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Cadastro /> },
  { path: "/login", element: <Login/> },
  { path: "/dashboard", element: <DashboardHub/>}
  // { path: "/admin", element: </> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
