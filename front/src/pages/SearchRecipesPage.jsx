import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Recipes from "../components/recipes/Recipes.jsx";

SearchRecipesPage.propTypes = {
  ingredientsForSearch: PropTypes.object,
};

function SearchRecipesPage(props) {
  const [recipes, setRecipes] = useState([]);
  const ingredientsForSearch = props.ingredientsForSearch;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/recipes/search", {
          method: "POST",
          body: JSON.stringify(ingredientsForSearch),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const recipesJson = await response.json();
          recipesJson.map((r) => (r.id = String(r.id)));
          setRecipes(recipesJson);

          console.log("on Load", recipesJson);
        } else {
          console.error("Error in fetch");
        }
      } catch (e) {
        console.log({ error: e });
      }
    }
    fetchData();
  }, [ingredientsForSearch]);

  return (
    <div className="container ps-0 pe-0">
        <h1>Search results</h1>
      <Recipes recipes={recipes} setRecipes={setRecipes} />
    </div>
  );
}

export default SearchRecipesPage;
