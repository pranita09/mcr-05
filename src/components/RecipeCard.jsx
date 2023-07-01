import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecipe } from "../contexts/RecipeContext";
import { Modal } from "@mui/material";
import { BiPencil, BiTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { RecipeForm } from "./RecipeForm";

export const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { dispatch } = useRecipe();
  const [showRecipeFormToEdit, setShowRecipeFormToEdit] = useState(false);
  return (
    <div className="p-2 border shadow-2xl rounded-md  relative">
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
      <div className="absolute top-0 right-0 bg-[white] p-2 flex items-center justify-center gap-2">
        <div
          className="text-xl cursor-pointer"
          onClick={(e) => setShowRecipeFormToEdit(true)}
        >
          <BiPencil />
        </div>
        <div
          className="text-xl cursor-pointer"
          onClick={() => {
            toast.success("recipe deleted successfully!");
            dispatch({ type: "DELETE_RECIPE", payload: recipe });
          }}
        >
          <BiTrash />
        </div>
      </div>
      <Modal
        open={showRecipeFormToEdit}
        onClose={() => setShowRecipeFormToEdit(false)}
      >
        <>
          <RecipeForm
            recipe={recipe}
            setShowRecipeFormToEdit={setShowRecipeFormToEdit}
          />
        </>
      </Modal>
    </div>
  );
};
