import React, { Fragment } from "react";
import PropTypes from "prop-types";
import RecipeIngredient from "./RecipeIngredient.jsx";

RecipeDetails.propTypes = {
  instructions: PropTypes.string,
  ingredients: PropTypes.array,
  key: PropTypes.number,
  title: PropTypes.string,
  recipeId: PropTypes.number,
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


  async function addToMyRecipes(id) {
    console.log("will add this recipe id", id);
    try {
      const response = await fetch(`/api/myrecipes/${id}`);
      if (response.ok) {
        console.log("successfully added a recipe to myrecipes");
      } else {
        console.error(`Error in fetch /api/myrecipes/${id}`);
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  return (
    <div>
      <button
        className="btn btn-start"
        style={{ float: "right" }}
        onClick={() => addToMyRecipes(props.recipeId)}
      >
        Add
      </button>
      <h3>{props.title}</h3>
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
  );
}

export default RecipeDetails;
