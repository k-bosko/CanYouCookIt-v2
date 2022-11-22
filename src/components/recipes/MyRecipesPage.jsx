import React, { useState, useEffect } from "react";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import Recipes from "./Recipes.jsx";
import CreateRecipe from "./CreateRecipe.jsx";

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
    <div>
      <Header />
      <div className="container">
        <div className="d-flex align-content-start">
          <h1>My Recipes</h1>
          <CreateRecipe
            recipes={recipes}
            setRecipes={setRecipes}
          />
        </div>
        <Recipes
          recipes={recipes}
          setRecipes={setRecipes}
          isMyRecipesPage={true}
        />
      </div>
      <Footer />
    </div>
  );
}

export default MyRecipesPage;
