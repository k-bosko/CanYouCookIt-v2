import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import "./CreateRecipe.css";

UpdateRecipe.propTypes = {
  setRecipes: PropTypes.func,
  setShowUpdateModal: PropTypes.func,
  showUpdateModal: PropTypes.bool,
  setCurrentRecipe: PropTypes.func,
};

function UpdateRecipe(props) {
  //   const [inputFields, setInputFields] = useState([{ ingredient: "" }]);
  const numInputFields = props.recipe.extendedIngredients.length;
  const initialIngredients = Array(numInputFields).fill({ ingredient: "" });
  const [inputFields, setInputFields] = useState(initialIngredients);

  const [changeUploadImage, setChangeUploadImage] = useState(false);
  //Modal
  function handleClose() {
    setInputFields(initialIngredients);
    props.setShowUpdateModal(false);
    setChangeUploadImage(false);
  }

  function addInputField() {
    // console.log("inside addInputField");
    setInputFields([
      ...inputFields,
      {
        ingredient: "",
      },
    ]);
  }

  function removeInputFields(idx) {
    if (inputFields.length > 1) {
      const rows = [...inputFields];
      rows.splice(idx, 1);
      setInputFields(rows);
    }
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
    console.log("eventData", eventData);
    const title = eventData.filter((formElem) => formElem.id === "title")[0]
      .value;
    const instructions = eventData.filter(
      (formElem) => formElem.id === "instructions"
    )[0].value;

    const imageOldUrl = eventData.filter(
      (formElem) => formElem.id === "imageOldUrl"
    )[0].name;
    console.log("imageOldUrl", imageOldUrl);

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
    };
    handleClose();
    props.setRecipes((prevRecipes) => {
      prevRecipes.map((r) =>
        r.id === updatedRecipe.id
          ? ((r.image = updatedRecipe.image), (r.title = updatedRecipe.title))
          : r
      );
      //   console.log("prevRecipe", [...prevRecipes]);
      return [...prevRecipes];
    });
    props.setCurrentRecipe(updatedRecipe);
    updateRecipe(updatedRecipe);
  };

  //TODO add unlinking old image when updating
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

  function handleChange(event) {
    // console.log("inside handleChange Update Recipe modal");
    const { name, value } = event.target;
    props.setCurrentRecipe((prevRecipe) => {
      if (name === "ingredients") {
        console.log("will be updating ingredients");
        console.log(prevRecipe.extendedIngredients);
        // prevRecipe.extendedIngredients.map(
        //   (ingr, idx) =>
        //     ingr === prevRecipe.extendedIngredients[idx] && console.log(ingr)
        // );
        // prevRecipe.extendedIngredients[props.idx].original = value;
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
        onHide={handleClose}
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
              {inputFields.map((data, idx) => {
                return (
                  <Form.Control
                    key={idx}
                    as="textarea"
                    rows={1}
                    name="ingredients"
                    id="ingredients"
                    aria-placeholder={
                      props.recipe.extendedIngredients.length > 0 &&
                      props.recipe.extendedIngredients[idx].original
                    }
                    value={
                      props.recipe.extendedIngredients.length > 0 &&
                      props.recipe.extendedIngredients[idx].original
                    }
                    onChange={handleChange}
                  />
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
              <Button
                aria-label="remove ingredient field"
                className="btn btn-custom btn-red"
                type="button"
                name="deleteInputField"
                onClick={removeInputFields}
              >
                <i className="bi bi-x-lg"></i>
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
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateRecipe;
