import { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

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
      <h2 className="text-xl my-2">Search Pokemon</h2>
      <div>
        <input
          type="text"
          className="border border-gray-400 rounded-md p-2 w-full mb-4"
          placeholder="Enter a Pokemon name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 p-2 text-white rounded-lg my-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredPokemon?.map((poke) => (
          <Link
            to={`/detail/${poke.name}`}
            key={poke.name}
            className="p-2 bg-white rounded-md hover:bg-blue-100 transition duration-300 transform hover:scale-105 text-center"
          >
            {poke.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
