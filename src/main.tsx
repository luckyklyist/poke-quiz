import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokeDetail from "./Components/PokeDetail.tsx";
import Quiz from "./Components/QuizQuestion.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detail/:id",
    element: <PokeDetail />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
