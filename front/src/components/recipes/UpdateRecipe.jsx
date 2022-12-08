import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import "./CreateRecipe.css";

UpdateRecipe.propTypes = {
  recipe: PropTypes.object,
  setRecipes: PropTypes.func,
  setShowUpdateModal: PropTypes.func,
  showUpdateModal: PropTypes.bool,
  setCurrentRecipe: PropTypes.func,
};

function UpdateRecipe(props) {
  const [oldRecipe, _] = useState(() => {
    const recipe = {
      title: props.recipe.title,
      extendedIngredients: [],
      instructions: props.recipe.instructions,
    };
    for (const ingr of props.recipe.extendedIngredients) {
      recipe.extendedIngredients.push({ ...ingr });
    }
    return recipe;
  });

  //   console.log("oldRecipe", oldRecipe);
  const [changeUploadImage, setChangeUploadImage] = useState(false);
  //Modal
  function handleCancel() {
    console.log(oldRecipe);
    props.setCurrentRecipe((prevRecipe) => {
      prevRecipe.title = oldRecipe.title;
      prevRecipe.extendedIngredients = oldRecipe.extendedIngredients;
      prevRecipe.instructions = oldRecipe.instructions;
      return { ...prevRecipe };
    });
    handleClose();
  }

  function handleClose() {
    console.log(oldRecipe);
    props.setShowUpdateModal(false);
    setChangeUploadImage(false);
  }

  function addInputField() {
    console.log("before add", props.recipe.extendedIngredients);
    props.setCurrentRecipe((prevRecipe) => {
      let { extendedIngredients } = prevRecipe;
      if (extendedIngredients.findIndex((e) => e.original === "") === -1) {
        prevRecipe.extendedIngredients = [
          ...extendedIngredients,
          { id: uuidv4(), original: "" },
        ];
      }
      return { ...prevRecipe };
    });
    console.log("after add", props.recipe.extendedIngredients);
  }

  function removeInputFields(ingredient) {
    props.setCurrentRecipe((prevRecipe) => {
      const newIngredients = prevRecipe.extendedIngredients.filter(
        (ing) => ing.id !== ingredient.id
      );
      prevRecipe.extendedIngredients = newIngredients;
      return { ...prevRecipe };
    });
  }

  async function updateRecipe(updatedRecipe) {
    console.log("will update this recipe id", updatedRecipe.id);
    try {
      const response = await fetch("/api/myrecipes/update", {
        method: "POST",
        body: JSON.stringify({ updatedRecipe: updatedRecipe }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("successfully updated a recipe in MyRecipes");
      } else {
        console.error("Error in fetch /api/myrecipes/update");
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = [...event.target];
    // console.log("eventData", eventData);
    const title = eventData.filter((formElem) => formElem.id === "title")[0]
      .value;
    const instructions = eventData.filter(
      (formElem) => formElem.id === "instructions"
    )[0].value;

    const imageOldUrl = eventData.filter(
      (formElem) => formElem.id === "imageOldUrl"
    )[0].name;
    // console.log("imageOldUrl", imageOldUrl);

    let imageUrl;
    if (changeUploadImage) {
      const imageFile = eventData.filter(
        (formElem) => formElem.id === "imageFile"
      )[0].files[0];
      const response = await handleFile(imageFile);
      unlinkFile(imageOldUrl);
      imageUrl = response ? response.fileUrl : "/images/new-recipe.png";
    } else {
      imageUrl = imageOldUrl;
    }

    const extendedIngredients = eventData
      .filter((formElem) => formElem.name === "ingredients")
      .map((ingrData) => {
        return { id: uuidv4(), original: ingrData.value };
      });

    const updatedRecipe = {
      _id: props.recipe._id,
      id: props.recipe.id,
      title: title,
      image: imageUrl,
      extendedIngredients: extendedIngredients,
      instructions: instructions ? instructions : "No instructions provided",
      timestamp: props.recipe.timestamp,
      userId: props.recipe.userId,
    };
    handleClose();
    props.setRecipes((prevRecipes) => {
      prevRecipes.map((r) =>
        r.id === updatedRecipe.id
          ? ((r.image = updatedRecipe.image),
            (r.title = updatedRecipe.title),
            (r.extendedIngredients = updatedRecipe.extendedIngredients),
            (r.instructions = updatedRecipe.instructions))
          : r
      );
      return [...prevRecipes];
    });
    updateRecipe(updatedRecipe);
  };

  //unlink old image when updating
  async function unlinkFile(imageUrl) {
    if (!imageUrl) {
      return;
    }
    try {
      const response = await fetch("/api/myrecipes/unlink", {
        method: "POST",
        body: JSON.stringify({ imageUrl: imageUrl }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("successfully unlinked an image");
      } else {
        console.error("Error in fetch api/myrecipes/unlink");
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  async function handleFile(file) {
    const formData = new FormData();
    formData.append("imageFile", file);

    if (!file) {
      return;
    }

    // console.log(file);
    try {
      const response = await fetch("/api/myrecipes/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("successfully uploaded an image");
        const result = await response.json();

        return result;
      } else {
        console.error("Error in fetch api/myrecipes/upload");
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  function handleChange(event, idx) {
    const { name, value } = event.target;
    props.setCurrentRecipe((prevRecipe) => {
      if (name === "ingredients") {
        const { extendedIngredients } = prevRecipe;
        extendedIngredients[idx].original = value;
        return { ...prevRecipe };
      } else {
        return { ...prevRecipe, [name]: value };
      }
    });
  }

  function handleCheckboxChange(event) {
    setChangeUploadImage((prev) => !prev);
  }

  return (
    <>
      <Modal
        aria-labelledby="dialog1Title"
        show={props.showUpdateModal}
        onHide={handleCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id="dialog1Title">Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="recipeForm">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="title">
                New Title: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="title"
                id="title"
                as="textarea"
                rows={1}
                autoFocus
                required
                value={props.recipe.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="imageFile">New Image (optional):</Form.Label>
              <Form.Check
                type="checkbox"
                label="Update image"
                value={changeUploadImage}
                onChange={handleCheckboxChange}
                id="checkboxUploadImage"
                name="checkboxUploadImage"
              />
              {changeUploadImage && (
                <Form.Control
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="imageFile"
                  id="imageFile"
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ingredients">New Ingredients:</Form.Label>
              {props.recipe.extendedIngredients.map((ingredient, idx) => {
                return (
                  <div className="row" key={ingredient.id}>
                    <div className="col-10">
                      <Form.Control
                        as="textarea"
                        rows={1}
                        name="ingredients"
                        id="ingredients"
                        aria-placeholder={ingredient.original}
                        value={ingredient.original}
                        onChange={(e) => handleChange(e, idx)}
                      />
                    </div>
                    <div className="col-1">
                      <Button
                        aria-label="remove ingredient field"
                        className="btn btn-custom btn-red"
                        type="button"
                        name="deleteInputField"
                        onClick={() => removeInputFields(ingredient)}
                      >
                        <i className="bi bi-x-lg"></i>
                      </Button>
                    </div>
                  </div>
                );
              })}
              <Button
                aria-label="add ingredient field"
                className="btn btn-custom btn-green"
                type="button"
                name="addInputField"
                onClick={addInputField}
              >
                <i className="bi bi-plus-lg"></i>
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="instructions">New Instructions:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="instructions"
                name="instructions"
                onChange={handleChange}
                value={props.recipe.instructions}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="btn btn-custom btn-green"
            type="submit"
            form="recipeForm"
            name={props.recipe.image}
            id="imageOldUrl"
          >
            Update
          </Button>
          <Button
            variant="btn btn-custom btn-red"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateRecipe;
