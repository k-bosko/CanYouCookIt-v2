import React, { useState, useEffect } from "react";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import Recipes from "./Recipes.jsx";

function RecipesPage() {
  //TODO change to realUserId when users implemented
  // const userId = "637314759f3b63df03cb0055";

  const [recipes, setRecipes] = useState([]);
  const [detail, setDetail] = useState({
    instructions: "",
    extendedIngredients: [],
  });

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
          console.log("on Load", recipesJson);
          await showRecipeDetails(recipesJson[0].id);
        } else {
          console.error("Error in fetch");
        }
      } catch (e) {
        console.log({ error: e });
      }
    }
    fetchData();
  }, []);

  async function showRecipeDetails(id) {
    console.log("showRecipeDetails", id);
    try {
      const response = await fetch(`/api/recipe/${id}`);
      if (response.ok) {
        const detailJson = await response.json();
        setDetail(detailJson);
      } else {
        console.error(`Error in fetch /api/recipe/${id}`);
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  async function addToMyRecipes(id) {
    console.log("will add this recipe id", id);
    try {
      const response = await fetch(`/api/myrecipes/${id}`);
      if (response.ok) {
        console.log("successfully added a recipe to myrecipes");
      } else {
        console.error(`Error in fetch /api/myrecipes/${id}`);
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Search results:</h1>
        <Recipes
          buttonText={<i className="bi bi-plus-lg"></i>}
          isMyRecipesPage={false}
          detail={detail}
          recipes={recipes}
          showRecipeDetails={showRecipeDetails}
          onClick={addToMyRecipes}
        />
      </div>
      <Footer />
    </div>
  );
}

export default RecipesPage;
