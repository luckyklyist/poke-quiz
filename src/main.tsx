import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import PokeDetail from "./Components/PokeDetail.tsx";
import Quiz from "./Components/QuizQuestion.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar.tsx";
import SignIn from "./page/SignIn.tsx";
import ProfilePage from "./page/Profile.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<App />} />
      <Route path="/pokemon/:name" element={<PokeDetail />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

function Root() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </>
  );
}
