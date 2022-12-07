import React, { useState } from "react";
import PropTypes from "prop-types";
import "./RecipeCard.css";

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  setCurrentRecipe: PropTypes.func,
  showRecipeDetails: PropTypes.func,
  isMyRecipesPage: PropTypes.bool,
};

function RecipeCard(props) {
  const [isMouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  return (
    <div
      className="card me-5 mb-5"
      style={{
        border: isMouseOver ? "1px solid red" : "1px solid lightgrey",
        width: "15rem",
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => {
        props.isMyRecipesPage
          ? props.setCurrentRecipe(props.recipe)
          : props.showRecipeDetails(props.recipe.id);
      }}
    >
      <div className="card-body">
        <img
          src={props.recipe.image}
          alt={props.recipe.title}
          className="RecipeCardImage mb-4"
        />
        <p className="RecipeCardTitle">
          {props.recipe.title.length > 30
            ? props.recipe.title.substring(0, 30) + "..."
            : props.recipe.title}
        </p>
      </div>
    </div>
  );
}

export default RecipeCard;
