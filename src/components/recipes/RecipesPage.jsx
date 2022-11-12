import React from "react";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import Recipes from "./Recipes.jsx";

function RecipesPage() {

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Search results:</h1>
        <Recipes />
      </div>
      <Footer />
    </div>
  );
}

export default RecipesPage;
