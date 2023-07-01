import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { useRecipe } from "../contexts/RecipeContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Modal } from "@mui/material";
import { RecipeForm } from "../components/RecipeForm";

export const Home = () => {
  const navigate = useNavigate();
  const { dispatch, searchRecipes } = useRecipe();

  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [showRecipeFormToEdit, setShowRecipeFormToEdit] = useState(false);

  return (
    <div className="text-center">
      <h1 className="text-3xl p-4 font-semibold">Recipe Organizer</h1>
      <hr />
      <SearchBar />
      <div className="py-6 flex flex-wrap items-center justify-center gap-8">
        {searchRecipes()?.map((recipe) => (
          <div
            key={recipe?.id}
            className="p-2 border shadow-2xl rounded-md  relative"
          >
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
                onClick={() =>
                  dispatch({ type: "DELETE_RECIPE", payload: recipe })
                }
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
        ))}
        <div>
          <div
            className="cursor-pointer"
            onClick={() => setShowRecipeForm(true)}
          >
            <AiOutlinePlusCircle className="text-3xl hover:scale-110" />
          </div>
        </div>

        <Modal open={showRecipeForm} onClose={() => setShowRecipeForm(false)}>
          <>
            <RecipeForm toAdd={"toAdd"} setShowRecipeForm={setShowRecipeForm} />
          </>
        </Modal>
      </div>
    </div>
  );
};
