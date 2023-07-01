import { useParams } from "react-router-dom";
import { useRecipe } from "../contexts/RecipeContext";

export const RecipeDetail = () => {
  const { recipeId } = useParams();
  const { state } = useRecipe();

  const recipe = state?.recipeData?.find(
    (recipe) => recipe.id === parseInt(recipeId)
  );
  return (
    <div className="p-2 text-center">
      <h1 className="text-3xl py-2">{recipe?.name}</h1>
      <div className="flex shadow-2xl rounded-md">
        <div>
          <img src={recipe?.imgUrl} alt={recipe?.name} className="" />
        </div>
        <div className="p-2">
          <div>
            <span>Cuisine:</span>
            <span>{recipe?.cuisine}</span>
          </div>
          <div>
            <span>Ingredients:</span>
            <span>{recipe?.ingredients}</span>
          </div>
          <div>
            <span>Instructions:</span>
            <span>{recipe?.instructions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};