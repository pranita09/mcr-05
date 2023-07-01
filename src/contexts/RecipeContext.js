import { createContext, useContext, useEffect, useReducer } from "react";
import { recipeData } from "../data/data";

export const RecipeContext = createContext();

const initialState = {
  recipeData: recipeData,
  searchCategory: "name",
  searchInput: "",
};

const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "SET_SEARCH_CATEGORY":
      return { ...state, searchCategory: payload };
    case "SET_SEARCH_INPUT":
      return { ...state, searchInput: payload };
    case "ADD_RECIPE":
      return { ...state, recipeData: [...state.recipeData, payload] };
    case "DELETE_RECIPE":
      return {
        ...state,
        recipeData: state.recipeData.filter(
          (recipe) => recipe.id !== payload.id
        ),
      };
    case "UPDATE_RECIPE":
      return {
        ...state,
        recipeData: state.recipeData.map((recipe) =>
          recipe.id === payload.id ? payload : recipe
        ),
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

  //   useEffect(() => {
  //     localStorage.setItem("recipes", JSON.stringify(state?.recipeData));
  //   }, [state?.recipeData]);

  return (
    <RecipeContext.Provider value={{ state, dispatch, searchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);
