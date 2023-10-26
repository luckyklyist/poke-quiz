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

  useEffect(() => {
    const getPokemon = () => {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then((res) => {
          setPokemon(res.results);
          setFilteredPokemon(res.results);
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
    <div className="bg-gray-100 p-4 shadow-xl border-2 border-gray-500">
      <h1 className="text-3xl font-bold mb-4 text-center hover:scale-110 duration-300">
        Pokemon
      </h1>
      <img
        src="https://purepng.com/public/uploads/large/purepng.com-pokemonpokemonpocket-monsterspokemon-franchisefictional-speciesone-pokemonmany-pokemonone-pikachu-1701527785496n5wbg.png"
        alt=""
        className="mx-auto rounded-lg mb-4 h-80 border border-gray-400 p-4"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-xl my-2">Search Pokemon</h2>
        <div className="w-full max-w-md my-4 flex">
          <div className="relative flex-grow mr-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-[.5px] focus:ring-gray-500 h-12"
              placeholder="Enter a Pokemon name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="w-32 h-12 bg-black p-3 text-white rounded-lg hover:scale-110 transition duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon?.map((poke) => (
          <Link
            to={`/pokemon/${poke.name}`}
            key={poke.name}
            className="p-3 bg-white rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 text-center border border-gray-300"
          >
            {poke.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
