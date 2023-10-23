import { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>();
  const [nextPage, setNextPage] = useState<string | null>();

  useEffect(() => {
    const getPokemon = () => {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then((res) => {
          setPokemon(res.results);
          setFilteredPokemon(res.results);
          setNextPage(res.next);
        });
    };
    getPokemon();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (!pokemon) return null;

    const filtered = pokemon.filter((poke) => poke.name.includes(query));
    setFilteredPokemon(filtered);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center hover:scale-110 duration-300">
        Pokemon
      </h1>
      <img
        src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c319.png"
        alt=""
        className="mx-auto rounded-lg mb-4 h-80"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-xl my-2">Search Pokemon</h2>
        <div className="w-full max-w-md my-4">
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a Pokemon name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="w-full bg-blue-500 p-3 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon?.map((poke) => (
          <Link
            to={`/pokemon/${poke.name}`}
            key={poke.name}
            className="p-3 bg-white rounded-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105 text-center"
          >
            {poke.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
