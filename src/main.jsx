import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AddTask from "./pages/AddTask.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  {path: "/add-task", element: <AddTask />}
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
);
