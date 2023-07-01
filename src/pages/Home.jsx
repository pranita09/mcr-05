import { SearchBar } from "../components/SearchBar";
import { useRecipe } from "../contexts/RecipeContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import { Modal } from "@mui/material";
import { RecipeForm } from "../components/RecipeForm";
import { RecipeCard } from "../components/RecipeCard";

export const Home = () => {
  const { searchRecipes } = useRecipe();

  const [showRecipeForm, setShowRecipeForm] = useState(false);

  return (
    <div className="text-center">
      <h1 className="text-3xl p-4 font-semibold">Recipe Organizer</h1>
      <hr />
      <SearchBar />
      <div className="py-6 flex flex-wrap items-center justify-center gap-8">
        {searchRecipes()?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
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
