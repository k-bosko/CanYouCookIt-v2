import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function CreateRecipe() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function addToMyRecipes(id) {
    console.log("addToMyRecipes id", id);
    try {
      const response = await fetch(`/api/myrecipes/${id}`);
      if (response.ok) {
        console.log("successfully added a recipe to MyRecipes");
      } else {
        console.error(`Error in fetch /api/myrecipes/${id}`);
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  async function addToRecipes(newRecipe) {
    console.log("addToRecipes id", newRecipe.id);
    try {
      const response = await fetch("/api/recipes/new", {
        method: "POST",
        body: JSON.stringify({ newRecipe: newRecipe }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("successfully added a recipe to Recipes");
      } else {
        console.error("Error in fetch /api/recipes/new");
      }
    } catch (e) {
      console.log({ error: e });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const [title, image, ingredients, instructions, id] = event.target;
    const newRecipe = {
      id: id.name,
      title: title.value,
      image: image.value ? image.value : "/images/new-recipe.png",
      ingredients: ingredients.value,
      instructions: instructions.value,
    };
    console.log(newRecipe);
    handleClose();
    addToMyRecipes(id.name);
    addToRecipes(newRecipe);
  };

  return (
    <>
      <Button variant="btn btn-create ms-5" onClick={handleShow}>
        {<i className="bi bi-plus-lg"></i>}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="recipeForm">
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control as="textarea" rows={1} autoFocus required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image (optional):</Form.Label>
              <Form.Control type="file" accept=".png, .jpg, .jpeg" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ingredients:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructions:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="btn btn-custom btn-green"
            type="submit"
            form="recipeForm"
            name={uuidv4()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateRecipe;
