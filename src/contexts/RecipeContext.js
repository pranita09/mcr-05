import { createContext, useContext, useEffect, useReducer } from "react";
import { recipeData } from "../data/data";
import { initialState, reducerFunc } from "../reducer/recipeReducer";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const searchRecipes = () => {
    return state?.searchInput === ""
      ? state?.recipeData
      : state?.recipeData.filter((recipe) => {
          if (state?.searchCategory === "name") {
            return recipe.name
              .toLowerCase()
              .includes(state?.searchInput.toLowerCase());
          } else if (state?.searchCategory === "ingredients") {
            return recipe.ingredients
              .join(" ")
              .toLowerCase()
              .includes(state?.searchInput.toLowerCase());
          } else if (state?.searchCategory === "cuisine") {
            return recipe.cuisine
              .toLowerCase()
              .includes(state?.searchInput.toLowerCase());
          }
        });
  };

  useEffect(() => {
    const storedRecepies = localStorage.getItem(
      "recipes",
      JSON.stringify(recipeData)
    );
    if (storedRecepies) {
      localStorage.setItem("recipes", JSON.stringify(recipeData));
      dispatch({
        type: "SET_RECEPIES",
        payload: JSON.parse(storedRecepies),
      });
    } else {
      dispatch({ type: "SET_RECEPIES", payload: JSON.parse(recipeData) });
    }
  }, []);

  return (
    <RecipeContext.Provider value={{ state, dispatch, searchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);
