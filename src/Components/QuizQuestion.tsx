import { useEffect, useState } from "react";
import useGetPokemonDetail from "../Hooks/useGetPokemonDetail";
import useGetRandomPokemonImg from "../Hooks/useGetRandomPokemonImg";
import getRandomNumber from "../getRandomNumber";
import { toast } from "react-toastify";
import useLocalStorage from "../Hooks/useLocalStorage";
import service from "../appwrite/appwriteConfig";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Option {
  value: string | undefined;
  label: string;
}

function MultipleChoiceQuestion() {
  const [key, setKey] = useState(0);
  const randomNumber = getRandomNumber();
  const [points, setPoints] = useLocalStorage("points", 0);
  const [life, setLife] = useState(2);
  const { pokemon, loading, error } = useGetPokemonDetail(
    `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
    key
  );
  const { img } = useGetRandomPokemonImg(key);
  const [selectedValue, setSelectedValue] = useState("");
  const userEmail = useSelector((state: RootState) => state.auth.email);

  useEffect(() => {
    if (life === 0) {
      // Save the user Points
      const updatePoints = async () => {
        await service
          .updatePortfolioByUserId({
            userId: userEmail,
            userBody: { points: points },
          })
          .then(() => console.log("Points Updated"));
      };
      updatePoints();
    }
  }, [life]);

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
      setPoints(points + 1);
    } else {
      toast.error("Wrong Answer!");
      setKey(key + 1);
      setPoints(points - 1);
      setLife(life - 1);
    }
  };

  function retry() {
    setKey(0);
    setPoints(0);
    setLife(2);
  }

  function shuffleTwoElements(arr: Option[]) {
    if (arr.length !== 2) {
      return arr;
    }

    const random = Math.random() < 0.5;

    if (random) {
      const temp = arr[0];
      arr[0] = arr[1];
      arr[1] = temp;
    }

    return arr;
  }

  const options: Option[] = [
    {
      value: img,
      label: "",
    },
    {
      value: pokemon?.sprites.front_default,
      label: "",
    },
  ];

  shuffleTwoElements(options);

  if (life === 0) {
    return (
      <div className="flex  flex-col items-center">
        <img
          src="https://img.freepik.com/free-vector/game-with-glitch-effect_225004-661.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698019200&semt=ais"
          alt=""
          className="w-96 h-96 mx-auto mb-10"
        />
        <div
          className="bg-blue-500 p-2 w-40 rounded-lg  text-white hover:scale-110 duration-300"
          onClick={retry}
        >
          Retry
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-300 rounded-lg p-4 shadow-md">
      <p className="text-lg font-semibold mb-4">
        Select the image of this Pokemon {pokemon?.name}
      </p>
      <p className="text-lg font-semibold mb-4">Your Life: {life}</p>
      <p className="text-lg font-semibold mb-4">Points: {points}</p>
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
