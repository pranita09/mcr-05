export const initialState = {
    recipeData: [],
    searchCategory: "name",
    searchInput: "",
  };
  
  export const reducerFunc = (state, { type, payload }) => {
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