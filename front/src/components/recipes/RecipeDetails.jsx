import React, { useState } from "react";
import PropTypes from "prop-types";
import { getUnique } from "../../utils/utils.js";
import RecipeDetailsElement from "./RecipeDetailsElement.jsx";
import RecipeDetailsIngredient from "./RecipeDetailsIngredient.jsx";
import { Modal, Button } from "react-bootstrap";
import "./RecipeDetails.css";

RecipeDetails.propTypes = {
  recipe: PropTypes.object,
  deleteOrAddAction: PropTypes.func,
  setRecipes: PropTypes.func,
  isMyRecipesPage: PropTypes.bool,
  isAdding: PropTypes.bool,
};

function RecipeDetails(props) {
  //Modal
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  function handleClose() {
    setShowDeleteDialog(false);
  }
  const handleShow = () => setShowDeleteDialog(true);

  return (
    props.recipe && (
      <div>
        <div>
          <button
            aria-label={
              props.isMyRecipesPage
                ? "Delete recipe"
                : props.isAdding
                ? "saving recipe to my collection"
                : "add recipe to my collection"
            }
            className={
              props.isMyRecipesPage
                ? "btn btn-custom btn-red"
                : "btn btn-custom btn-green"
            }
            style={{ float: "right" }}
            // onClick={() => props.deleteOrAddAction(props.recipe)}
            onClick={handleShow}
          >
            {props.isMyRecipesPage ? (
              <i className="bi bi-trash3"></i>
            ) : props.isAdding ? (
              <i className="bi bi-cloud-arrow-down"></i>
            ) : (
              <i className="bi bi-plus-lg"></i>
            )}
          </button>
          {props.isMyRecipesPage ? (
            <RecipeDetailsElement
              recipe={props.recipe}
              setRecipes={props.setRecipes}
              isTitle={true}
            />
          ) : (
            <h2>{props.recipe.title}</h2>
          )}
          <hr />
          <h2>Ingredients</h2>
          {/* Note: some ingredients returned from API call to Spoonacular return doubled
        --> need to filter with getUnique */}
          {getUnique(props.recipe.extendedIngredients, "id").map((ingr, idx) =>
            props.isMyRecipesPage ? (
              <RecipeDetailsElement
                key={props.recipe.extendedIngredients[idx].id}
                recipe={props.recipe}
                idx={idx}
                setRecipes={props.setRecipes}
                isIngredient={true}
              />
            ) : (
              <RecipeDetailsIngredient key={ingr.id} text={ingr.original} />
            )
          )}
          <hr />
          <h2>Instructions</h2>
          {props.isMyRecipesPage ? (
            <RecipeDetailsElement
              recipe={props.recipe}
              setRecipes={props.setRecipes}
              isInstructions={true}
            />
          ) : (
            <p>{props.recipe.instructions}</p>
          )}
        </div>
        <>
          <Modal
            aria-labelledby="ConfirmDeleteTitle"
            show={showDeleteDialog}
            onHide={handleClose}
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title id="ConfirmDeleteTitle">Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You are about to delete the current recipe.</p>
              <p>Do you want to proceed?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="btn btn-custom btn-green"
                type="button"
                onClick={() => props.deleteOrAddAction(props.recipe)}
              >
                Delete
              </Button>
              <Button
                variant="btn btn-custom btn-red"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    )
  );
}

export default RecipeDetails;
