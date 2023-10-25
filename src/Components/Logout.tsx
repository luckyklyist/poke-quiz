import authService from "../appwrite/auth";

const Logout = () => {
  return (
    <button
      className="bg-red-400 p-2 w-52 rounded-lg"
      onClick={() => authService.logout()}
    >
      Logout
    </button>
  );
};

export default Logout;
