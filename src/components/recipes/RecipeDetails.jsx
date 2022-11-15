import React from "react";
import PropTypes from "prop-types";
import RecipeIngredient from "./RecipeIngredient.jsx";

RecipeDetails.propTypes = {
  instructions: PropTypes.string,
  ingredients: PropTypes.array,
  title: PropTypes.string,
  recipeId: PropTypes.number,
  buttonText: PropTypes.object,
  onClick: PropTypes.func,
  isMyRecipesPage: PropTypes.bool,
};

function RecipeDetails(props) {
  function getUnique(arr, index) {
    const unique = arr
      .map((e) => e[index])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  function removeHtmlTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }

  return (
    props.title !== "" && (
      <div>
        <button
          className={
            props.isMyRecipesPage
              ? "btn btn-custom btn-red"
              : "btn btn-custom btn-green"
          }
          style={{ float: "right" }}
          onClick={() => props.onClick(props.recipeId)}
        >
          {props.buttonText}
        </button>
        <h3 style={{ display: "inline" }}>{props.title}</h3>
        <hr />
        <h3>Ingredients</h3>
        {/* Note: some ingredients returned from API call to Spoonacular return doubled
       --> need to filter with getUnique */}
        {getUnique(props.ingredients, "id").map((ingredient) => (
          <RecipeIngredient key={ingredient.id} text={ingredient.original} />
        ))}
        <hr />
        <h3>Instructions</h3>
        <p>
          {props.instructions === null
            ? "No instructions provided"
            : removeHtmlTags(props.instructions)}
        </p>
      </div>
    )
  );
}

export default RecipeDetails;
