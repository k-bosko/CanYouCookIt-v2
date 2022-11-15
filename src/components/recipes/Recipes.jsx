import React, { useEffect, useState } from "react";
import Recipe from "./Recipe.jsx";
import RecipeDetails from "./RecipeDetails.jsx";
import PropTypes from "prop-types";

Recipes.propTypes = {
  fetchApi: PropTypes.string,
  fetchMethod: PropTypes.string,
  needAddButton: PropTypes.bool,
};

function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [detail, setDetail] = useState({
    instructions: "",
    extendedIngredients: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(props.fetchApi, {
          method: props.fetchMethod,
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const recipesJson = await response.json();
          setRecipes(recipesJson);
          console.log(recipesJson);
          await showRecipeDetails(recipesJson[0].id);
        } else {
          console.error("Error in fetch api/recipes");
        }
      } catch (e) {
        console.log({ error: e });
      }
    }
    fetchData();
  }, []);

  async function showRecipeDetails(id) {
    // console.log(id);
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
  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              onClick={showRecipeDetails}
            />
          ))}
        </div>
      </div>
      <div className="col-6">
        <RecipeDetails
          recipeId={detail.id}
          title={detail.title}
          instructions={detail.instructions}
          ingredients={detail.extendedIngredients}
          needAddButton={props.needAddButton}
        />
      </div>
    </div>
  );
}

export default Recipes;
