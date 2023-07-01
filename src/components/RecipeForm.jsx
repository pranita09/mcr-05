import { useState } from "react";
import { useRecipe } from "../contexts/RecipeContext";
import { toast } from "react-hot-toast";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const RecipeForm = ({
  recipe,
  toAdd,
  setShowRecipeForm,
  setShowRecipeFormToEdit,
}) => {
  const { dispatch } = useRecipe();

  const [name, setName] = useState(recipe ? recipe.name : "");
  const [cuisine, setCuisine] = useState(recipe ? recipe.cuisine : "");
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients.join(", ") : ""
  );
  const [instructions, setInstructions] = useState(
    recipe ? recipe.instructions : ""
  );
  const [imgUrl, setImgUrl] = useState(recipe ? recipe.imgUrl : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      id: recipe ? recipe.id : Date.now(),
      name,
      cuisine,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions,
      imgUrl,
    };

    if (recipe) {
      dispatch({ type: "UPDATE_RECIPE", payload: newRecipe });
      toast.success("Recipe updated successfully!")
    } else {
      dispatch({ type: "ADD_RECIPE", payload: newRecipe });
      toast.success("Recipe added successfully!")
    }
    setName("");
    setCuisine("");
    setIngredients("");
    setInstructions("");
    setImgUrl("");
    toAdd && setShowRecipeForm(false);
    recipe && setShowRecipeFormToEdit(false);
  };

  return (
    <div style={styles} className="py-2 px-4 bg-[lightgrey] rounded-md">
      <h2 className="text-xl py-4 font-semibold">
        {recipe ? "Edit Recipe" : "Add Recipe"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-[black] rounded py-0.5 px-1 text-sm"
            required
          />
        </label>
        <br />
        <label>
          Cuisine:{" "}
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="border border-[black] rounded py-0.5 px-1 text-sm"
            required
          />
        </label>
        <br />
        <label>
          Ingredients (comma-separated):{" "}
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border border-[black] rounded py-0.5 px-1 text-sm"
            required
          />
        </label>
        <br />
        <label>
          Instructions:{" "}
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={5}
            cols={45}
            className="border border-[black] rounded py-0.5 px-1 text-sm"
            required
          ></textarea>
        </label>
        <br />
        <label>
          Image URL:{" "}
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="border border-[black] rounded py-0.5 px-1 text-sm"
          />
        </label>
        <br />
        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 border border-black rounded-md cursor-pointer bg-blue-300 hover:bg-green-300"
          >
            {recipe ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};
