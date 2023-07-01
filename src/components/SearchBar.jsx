import { useRecipe } from "../contexts/RecipeContext";

export const SearchBar = () => {
  const { state, dispatch } = useRecipe();

  const handleSearchCategoryChange = (e) => {
    dispatch({ type: "SET_SEARCH_CATEGORY", payload: e.target.value });
  };
  return (
    <div className="flex flex-wrap py-4 items-center justify-center gap-4">
      <div>
        <input
          type="text"
          value={state?.searchInput}
          placeholder={`Search by ${state?.searchCategory} `}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_INPUT", payload: e.target.value })
          }
          className="border rounded py-1 px-2"
        />
      </div>
      <span className="font-semibold">Filter: </span>
      <div className="flex gap-2">
        <label>
          <input
            type="radio"
            name="searchCategory"
            value="name"
            checked={state?.searchCategory === "name"}
            onChange={handleSearchCategoryChange}
          />{" "}
          Name
        </label>
        <label>
          <input
            type="radio"
            name="searchCategory"
            value="ingredients"
            checked={state?.searchCategory === "ingredients"}
            onChange={handleSearchCategoryChange}
          />{" "}
          Ingredients
        </label>
        <label>
          <input
            type="radio"
            name="searchCategory"
            value="cuisine"
            checked={state?.searchCategory === "cuisine"}
            onChange={handleSearchCategoryChange}
          />{" "}
          Cuisine
        </label>
      </div>
    </div>
  );
};
