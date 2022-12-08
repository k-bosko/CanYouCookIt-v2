import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  setCurrentRecipe: PropTypes.func,
  showRecipeDetails: PropTypes.func,
  isMyRecipesPage: PropTypes.bool,
};

function RecipeCard(props) {
  return (
    <div
      className="card me-5 mb-5"
      onClick={() => {
        props.isMyRecipesPage
          ? props.setCurrentRecipe(props.recipe)
          : props.showRecipeDetails(props.recipe.id);
      }}
    >
      <Link
        className="stretched-link no-decor"
      >
        <div className="card-body">
          <img
            src={props.recipe.image}
            alt="prepared recipe"
            className="RecipeCardImage mb-4"
          />
          <p className="RecipeCardTitle">
            {props.recipe.title.length > 30
              ? props.recipe.title.substring(0, 30) + "..."
              : props.recipe.title}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
