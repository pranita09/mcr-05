import { useParams } from "react-router-dom";

export const RecipeDetail = () => {
  const { recipeId } = useParams();
  return (
    <div>
      <h1>Recipe</h1>
    </div>
  );
};
