import React, { useEffect } from "react";
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
import CreateProfilePage from "./Components/CreateProifle.tsx";
import authService from "./appwrite/auth.ts";
import { useDispatch } from "react-redux";
import { login } from "./features/authSlice.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import LeaderboardTable from "./Components/LeaderBoardTable.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<App />} />
      <Route path="/pokemon/:name" element={<PokeDetail />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/leaderboard" element={<LeaderboardTable />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/createProfile" element={<CreateProfilePage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

function Root() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function isAuthenticated() {
      const resp = await authService.getUserSession();
      if (!resp) {
      } else {
        dispatch(login({ isLoggedIn: true, email: resp.email }));
      }
    }
    isAuthenticated();
  }, []);
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
