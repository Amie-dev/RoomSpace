import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Dashboard } from "./components/rooms";
import { LandingPage } from "./components/landing";
import "./index.css";
import { ThemeProvider } from "./components/common/theme.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App as the layout wrapper
    children: [
      {
        path: "/",
        element: <LandingPage />, // Show LandingPage at "/"
      },
      {
        path: "/app",
        element: <Dashboard />, // Show Dashboard at "/app"
      },
      {
        path: "/app/room/:uniqueId",
        element: <Dashboard />, // Show Dashboard for specific rooms
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
