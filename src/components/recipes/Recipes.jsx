import React, { useEffect, useState } from "react";
import Recipe from "./Recipe.jsx";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const recipesJson = await response.json();
          setRecipes(recipesJson);
        } else {
          console.error("Error in fetch api/recipes");
        }
      } catch (e) {
        console.log({ error: e });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {recipes.map((recipe, idx) => (
          <Recipe key={idx} title={recipe.title} image={recipe.image} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
