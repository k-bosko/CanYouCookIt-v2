import React, { useState, useEffect } from "react";
import BasePage from "./BasePage.jsx";

import Recipes from "../components/recipes/Recipes.jsx";
import CreateRecipe from "../components/recipes/CreateRecipe.jsx";

function MyRecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/myrecipes", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const recipesJson = await response.json();
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
  }, []);

  return (
    <BasePage>
      <div className="container">
        <div className="row ms-0 me-0">
          <div className="d-flex align-content-start ps-0 pe-0">
            <h1>My Recipes</h1>
            <CreateRecipe setRecipes={setRecipes} />
          </div>
        </div>
        <div>
          <Recipes
            recipes={recipes}
            setRecipes={setRecipes}
            isMyRecipesPage={true}
          />
        </div>
      </div>
    </BasePage>
  );
}

export default MyRecipesPage;
