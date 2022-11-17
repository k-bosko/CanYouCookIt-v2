import React from "react";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import Recipes from "./Recipes.jsx";
import CreateRecipe from "./CreateRecipe.jsx";

function MyRecipesPage() {
  //TODO change to realUserId when users implemented
  const userId = "637314759f3b63df03cb0055";

  return (
    <div>
      <Header />
      <div className="container">
        <div className="d-flex align-content-start">
          <h1>My Recipes</h1>
          <CreateRecipe />
        </div>
        <Recipes
          fetchApi={`/api/${userId}/myrecipes`}
          fetchMethod={"GET"}
          buttonText={<i className="bi bi-x-lg"></i>}
          isMyRecipesPage={true}
        />
      </div>
      <Footer />
    </div>
  );
}

export default MyRecipesPage;
