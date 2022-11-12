import express from "express";
import fetch from "node-fetch";
//TODO remove import of dummy recipes
import dummy_recipes from "./dummy_recipes.js";

const router = express.Router();

const RECIPES_LIMIT = 5;

/* ------Katerina----- */
/* POST recipes by ingredients */
router.post("/api/recipes", async function (req, res) {
  //   console.log(req);
  //const ingredients = req.body.ingredients;
  const ingredients = ["apples", "flour", "sugar"];
  console.log(ingredients);

  if (ingredients) {
    const baseUrl = "https://api.spoonacular.com/recipes/findByIngredients";
    const ingredientsString = ingredients.join("%2C");

    const url = `${baseUrl}?apiKey=${process.env.API_KEY}&ingredients=${ingredientsString}&number=${RECIPES_LIMIT}&ignorePantry=true&ranking=1`;
    const options = { method: "GET" };

    try {
      // TODO: uncomment real request & remove dummy_recipes
      //   const recipiesResponse = await fetch(url, options);
      //   const recipes = await recipiesResponse.json();

      const recipes = dummy_recipes;

      if (recipes) {
        res.status(200).json(recipes);
      } else {
        res
          .status(404)
          .send({ err: "no matched results from Spoonacular API" });
      }
    } catch (e) {
      res.status(400).send({ err: e });
    }
  } else {
    res.status(404).send({ err: "No ingredients" });
  }
});

/* ------Katerina end----- */

export default router;

//@Anshul - pass me ingredients like so:
// bodyToSend = {
//     "ingredients": ["apples", "flour", "sugar"]
// }

// await fetch(`/api/recipes`, {
//         method: "post",
//         body: bodyToSend,
//         headers: {
//             "Content-Type": "application/json",
//         },
