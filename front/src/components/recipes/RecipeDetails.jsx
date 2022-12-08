import React, { useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import { getUnique } from "../../utils/utils.js";
import RecipeDetailsElement from "./RecipeDetailsElement.jsx";
import RecipeDetailsIngredient from "./RecipeDetailsIngredient.jsx";
import UpdateRecipe from "./UpdateRecipe.jsx";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    props.recipe && (
      <div>
        <div className="row">
          <div className="col-11">
            {props.isMyRecipesPage ? (
              <RecipeDetailsElement
                recipe={props.recipe}
                setRecipes={props.setRecipes}
                isTitle={true}
                setCurrentRecipe={props.setCurrentRecipe}
              />
            ) : (
              <h2>{props.recipe.title}</h2>
            )}
            <hr />
            <h2>Ingredients</h2>
            {/* Note: some ingredients returned from API call to Spoonacular return doubled
        --> need to filter with getUnique */}
            {getUnique(props.recipe.extendedIngredients, "id").map(
              (ingr, idx) =>
                props.isMyRecipesPage ? (
                  <RecipeDetailsElement
                    key={props.recipe.extendedIngredients[idx].id}
                    recipe={props.recipe}
                    idx={idx}
                    setRecipes={props.setRecipes}
                    isIngredient={true}
                    setCurrentRecipe={props.setCurrentRecipe}
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
                setCurrentRecipe={props.setCurrentRecipe}
              />
            ) : (
              <p>{props.recipe.instructions}</p>
            )}
          </div>
          <div className="col-1">
            {/* update button */}
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  {props.isMyRecipesPage
                    ? "Update recipe"
                    : "Add recipe to my collection"}
                </Tooltip>
              }
            >
              <button
                aria-label={
                  props.isMyRecipesPage
                    ? "update recipe"
                    : props.isAdding
                    ? "saving recipe to my collection"
                    : "add recipe to my collection"
                }
                className="btn btn-custom btn-green mb-2"
                onClick={() => setShowUpdateModal(true)}
              >
                {props.isMyRecipesPage ? (
                  <i className="bi bi-pencil-square"></i>
                ) : props.isAdding ? (
                  <i className="bi bi-cloud-arrow-down"></i>
                ) : (
                  <i className="bi bi-plus-lg"></i>
                )}
              </button>
            </OverlayTrigger>
            {/* delete button */}
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  {props.isMyRecipesPage
                    ? "Delete recipe"
                    : "Check saved recipes"}
                </Tooltip>
              }
            >
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
                onClick={() => setShowDeleteModal(true)}
              >
                {props.isMyRecipesPage ? (
                  <i className="bi bi-trash3"></i>
                ) : props.isAdding ? (
                  <i className="bi bi-cloud-arrow-down"></i>
                ) : (
                  <i className="bi bi-plus-lg"></i>
                )}
              </button>
            </OverlayTrigger>
          </div>
        </div>
        {/* delete modal */}
        <>
          <Modal
            aria-labelledby="ConfirmDeleteTitle"
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
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
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        {/* update modal */}
        <UpdateRecipe
          key={props.recipe.id}
          recipe={props.recipe}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          setRecipes={props.setRecipes}
          setCurrentRecipe={props.setCurrentRecipe}
        />
      </div>
    )
  );
}

export default RecipeDetails;
