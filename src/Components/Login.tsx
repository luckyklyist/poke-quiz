import authService from "../appwrite/auth";

function LoginPage() {
  const googleLogin = () => {
    authService.googleLogin();
  };

  return (
    <div className="flex items-center justify-center h-1/2">
      <button
        className="bg-slate-700 p-4 rounded-lg shadow-md flex items-center space-x-2 transition duration-300 transform hover:scale-105 hover:shadow-lg my-5 mx-10"
        onClick={googleLogin}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Logo"
          className="w-6 h-6"
        />
        <span className="text-white font-semibold">Login with Google</span>
      </button>
    </div>
  );
}

export default LoginPage;
