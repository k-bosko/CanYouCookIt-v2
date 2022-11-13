import React from "react";
import PropTypes from "prop-types";
import RecipeIngredient from "./RecipeIngredient.jsx";

RecipeDetails.propTypes = {
  instructions: PropTypes.string,
  ingredients: PropTypes.array,
  key: PropTypes.number,
};

function RecipeDetails(props) {
  return (
    <div>
      <h2>Ingredients</h2>
      {props.ingredients.map((ingredient) => (
        <RecipeIngredient key={ingredient.id} text={ingredient.original} />
      ))}
      <hr />
      <h2>Instructions</h2>
      <p>{props.instructions}</p>
    </div>
  );
}

export default RecipeDetails;
