import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { useRecipe } from "../contexts/RecipeContext";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch, searchRecipes } = useRecipe();

  return (
    <div className="text-center">
      <h1 className="text-3xl p-4 font-semibold">Recipe Organizer</h1>
      <hr />
      <SearchBar />
      <div className="py-6 flex flex-wrap items-center justify-center gap-8">
        {searchRecipes()?.map((recipe) => (
          <div key={recipe?.id} className="p-2 border shadow-2xl rounded-md">
            <img
              src={recipe?.imgUrl}
              alt={recipe?.name}
              className="w-[200px] h-[250px] object-cover"
            />
            <p className="text-center text-lg py-2">{recipe?.name}</p>
            <div className="text-sm">
              <div className="flex justify-between items-center px-2">
                <p className="font-semibold">Cuisine Type:</p>
                <p>{recipe?.cuisine}</p>
              </div>
              <div className="flex justify-between items-center px-2">
                <p className="font-semibold">Ingredients:</p>
                <p
                  className="hover:underline cursor-pointer"
                  onClick={() => navigate(`/recipe/${recipe?.id}`)}
                >
                  See Recipe
                </p>
              </div>
              <div className="flex justify-between items-center px-2">
                <p className="font-semibold">Instructions:</p>
                <p
                  className="hover:underline cursor-pointer"
                  onClick={() => navigate(`/recipe/${recipe?.id}`)}
                >
                  See Recipe
                </p>
              </div>
            </div>
          </div>
        ))}
        <div>
          <div className="cursor-pointer">
            <AiOutlinePlusCircle className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
