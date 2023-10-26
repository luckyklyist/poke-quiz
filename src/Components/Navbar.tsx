import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loginStatus = useSelector((state: RootState) => state.auth.isLoggedIn);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { text: "Home", path: "/", active: true },
    { text: "quiz", path: "/quiz", active: true },
    { text: "LeaderBoard", path: "/leaderboard", active: true },
    { text: "Login", path: "/login", active: !loginStatus },
    { text: "Profile", path: "/profile", active: loginStatus },
  ];

  return (
    <nav className="bg-black p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Pokeee
        </Link>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none" />
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none" />
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>
        </div>

        <div className={`lg:flex ${isOpen ? "block" : "hidden"} mt-4 lg:mt-0`}>
          <ul className="lg:flex space-x-4">
            {navItems.map(
              (item, index) =>
                item.active && (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-white hover:text-gray-300"
                    >
                      {item.text}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
