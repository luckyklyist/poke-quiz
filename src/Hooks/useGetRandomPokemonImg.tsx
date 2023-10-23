import { useState, useEffect } from "react";
import getRandomNumber from "../getRandomNumber";

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

function useGetRandomPokemonImg(key: number) {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${getRandomNumber()}`
        );
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data: PokemonDetail = await response.json();
        setImg(data?.sprites.front_default);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return { img, loading, error };
}

export default useGetRandomPokemonImg;
