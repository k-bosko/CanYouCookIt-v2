import React from "react";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import Recipes from "../recipes/Recipes.jsx";

function MyRecipesPage() {
  //TODO change to realUserId when users implemented
  const userId = "637314759f3b63df03cb0055";
  const fetchApi = `/api/${userId}/myrecipes`;

  return (
    <div>
      <Header />
      <div className="container">
        <h1>My Recipes</h1>
        <Recipes fetchApi={fetchApi} fetchMethod={"GET"} needAddButton={false} />
      </div>
      <Footer />
    </div>
  );
}

export default MyRecipesPage;
