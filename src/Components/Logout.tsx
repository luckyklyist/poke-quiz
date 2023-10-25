import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-red-400 p-2 w-52 rounded-lg"
      onClick={() => {
        authService.logout();
        dispatch(logout());
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
