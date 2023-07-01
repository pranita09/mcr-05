import { useParams } from "react-router-dom";
import { useRecipe } from "../contexts/RecipeContext";

export const RecipeDetail = () => {
  const { recipeId } = useParams();
  const { state } = useRecipe();

  const recipe = state?.recipeData?.find(
    (recipe) => recipe.id === parseInt(recipeId)
  );
  return (
    <div className="p-2 text-center  ">
      <h1 className="text-3xl py-2 my-2">{recipe?.name}</h1>
      <div className="flex shadow-2xl rounded-md w-[80%] m-auto my-8">
        <div className="w-[100rem]">
          <img
            src={recipe?.imgUrl}
            alt={recipe?.name}
            className="w-full h-full rounded object-cover"
          />
        </div>
        <div className="p-2 text-start flex flex-col gap-2 my-4 px-4">
          <div className="text-xl">
            <span className="font-semibold">Cuisine: </span>
            <span>{recipe?.cuisine}</span>
          </div>
          <div>
            <span className="font-semibold">Ingredients: </span>
            <span>{recipe?.ingredients.join(", ")}</span>
          </div>
          <div>
            <span className="font-semibold">Instructions: </span>
            <span>{recipe?.instructions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
