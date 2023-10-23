import { useState } from "react";
import useGetPokemonDetail from "../Hooks/useGetPokemonDetail";
import useGetRandomPokemonImg from "../Hooks/useGetRandomPokemonImg";
import getRandomNumber from "../getRandomNumber";
import { toast } from "react-toastify";

function MultipleChoiceQuestion() {
  const [key, setKey] = useState(0);
  const randomNumber = getRandomNumber();
  const { pokemon, loading, error } = useGetPokemonDetail(
    `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
    key
  );
  const { img } = useGetRandomPokemonImg(key);
  const [selectedValue, setSelectedValue] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleOptionChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const checkAnswer = () => {
    if (selectedValue === pokemon?.sprites.front_default) {
      toast.success("Correct Answer!");
      setKey(key + 1);
    } else {
      toast.error("Wrong Answer!");
      setKey(key + 1);
    }
  };

  const options = [
    {
      value: img,
      label: "",
    },
    {
      value: pokemon?.sprites.front_default,
      label: "",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <p className="text-lg font-semibold mb-4">
        Select the image of this Pokemon {pokemon?.name}
      </p>
      <form>
        <div className="space-y-4">
          {options.map((option) => {
            return (
              <div key={option.value}>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    name="pokemon-choice"
                    className="form-radio"
                    value={option.value}
                    type="radio"
                    onChange={handleOptionChange}
                  />
                  <img
                    src={option.value}
                    alt={`Option B`}
                    className="w-20 h-40"
                  />
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={checkAnswer}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
function Quiz() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <MultipleChoiceQuestion />
    </div>
  );
}

export default Quiz;
