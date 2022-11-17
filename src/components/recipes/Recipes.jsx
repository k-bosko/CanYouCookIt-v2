import React from "react";
import PropTypes from "prop-types";
import Recipe from "./Recipe.jsx";
import RecipeDetails from "./RecipeDetails.jsx";

Recipes.propTypes = {
  detail: PropTypes.object,
  recipes: PropTypes.array,
  buttonText: PropTypes.object,
  isMyRecipesPage: PropTypes.bool,
  showRecipeDetails: PropTypes.func,
  onClick: PropTypes.func,
};

function Recipes(props) {

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          {props.recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipeId={recipe.id}
              title={recipe.title}
              image={recipe.image}
              onClick={() => props.showRecipeDetails(recipe.id)}
            />
          ))}
        </div>
      </div>
      <div className="col-6">
        <RecipeDetails
          recipeId={props.detail.id}
          title={props.detail.title}
          instructions={props.detail.instructions}
          ingredients={props.detail.extendedIngredients}
          buttonText={props.buttonText}
          isMyRecipesPage={props.isMyRecipesPage}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
}

export default Recipes;
