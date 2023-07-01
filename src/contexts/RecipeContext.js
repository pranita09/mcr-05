import { createContext, useContext, useEffect, useReducer } from "react";
import { recipeData } from "../data/data";

export const RecipeContext = createContext();

const initialState = {
  recipeData: [],
  searchCategory: "name",
  searchInput: "",
};

const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "SET_RECEPIES":
      return { ...state, recipeData: payload };
    case "SET_SEARCH_CATEGORY":
      return { ...state, searchCategory: payload };
    case "SET_SEARCH_INPUT":
      return { ...state, searchInput: payload };
    case "ADD_RECIPE":
      const updatedRecipeData = [...state.recipeData, payload];
      localStorage.setItem("recipes", JSON.stringify(updatedRecipeData));
      return { ...state, recipeData: updatedRecipeData };
    case "DELETE_RECIPE":
      const updatedRecipes = state.recipeData.filter(
        (recipe) => recipe.id !== payload.id
      );
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      return {
        ...state,
        recipeData: updatedRecipes,
      };
    case "UPDATE_RECIPE":
      const updatedData = state.recipeData.map((recipe) =>
        recipe.id === payload.id ? payload : recipe
      );
      localStorage.setItem("recipes", JSON.stringify(updatedData));
      return {
        ...state,
        recipeData: updatedData,
      };
    default:
      return state;
  }
};

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
    const storedRecepies = localStorage.getItem("recipes");
    if (storedRecepies) {
      dispatch({ type: "SET_RECEPIES", payload: JSON.parse(storedRecepies) });
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
