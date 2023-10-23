import React from "react";
import { useParams } from "react-router-dom";

interface PokemonDetail {
  name: string;
  height: number;
  sprites: {
    front_default: string;
    back_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
}

const PokeDetail = () => {
  const params = useParams<{ id: string }>();
  const [pokemon, setPokemon] = React.useState<PokemonDetail>();
  React.useEffect(() => {
    const getPokemon = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        .then((res) => res.json())
        .then((res) => setPokemon(res));
    };
    getPokemon();
  }, []);
  return (
    <div className="p-4 mx-auto max-w-md bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Poke ID: {params.id}</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Poke Name</h2>
          <p className="text-lg">{pokemon?.name}</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Poke Height</h2>
          <p className="text-lg">{pokemon?.height}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Dream World</h2>
          <img
            src={pokemon?.sprites?.other.dream_world.front_default}
            alt="Dream World"
            className="w-32 h-32"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Home</h2>
          <img
            src={pokemon?.sprites?.other.home.front_default}
            alt="Home"
            className="w-32 h-32"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Default</h2>
          <img
            src={pokemon?.sprites?.front_default}
            alt="Default"
            className="w-32 h-32"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Back Default</h2>
          <img
            src={pokemon?.sprites?.back_default}
            alt="Back Default"
            className="w-32 h-32"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Back Shiny</h2>
          <img
            src={pokemon?.sprites?.back_shiny}
            alt="Back Shiny"
            className="w-32 h-32"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Front Shiny</h2>
          <img
            src={pokemon?.sprites?.front_shiny}
            alt="Front Shiny"
            className="w-32 h-32"
          />
        </div>
      </div>
    </div>
  );
};

export default PokeDetail;
