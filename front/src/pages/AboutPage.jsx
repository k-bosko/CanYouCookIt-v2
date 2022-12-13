import React from "react";
import { Link } from "react-router-dom";
import BasePage from "./BasePage.jsx";

AboutPage.propTypes = {};

function AboutPage() {
  return (
    <BasePage>
      <div className="container">
        <h1>About</h1>
        <div className="row">
          <div className="col-7">
            <p>
              The app was built using React + Express.js + MongoDB +
              HTML5/Bootstrap. Its current version does not support user
              authentication.
            </p>
            <p>
              We use external API provider -{" "}
              <Link to="https://spoonacular.com/">Spoonacular</Link> - to find
              the recipes and there are only 150 API calls for free per day. If
              the limit is depleted, please come back next day.
            </p>
            <p>
              The project is part of the{" "}
              <Link to="https://johnguerra.co/classNamees/webDevelopment_fall_2022/">
                CS5610 Web Development
              </Link>{" "}
              at the Northeastern University.
            </p>
            <h2>How to use the app:</h2>
            <ol>
              <li>
                Start adding ingredients on Inventory page. To enable the "Add"
                button, you must select an ingredient from the dropdown menu.
              </li>
              <li>
                Update your ingredient's list by deleting ingredients you no
                longer have by clicking on "X" button
              </li>
              <li>
                Use checkbox to add ingredients to the search and press "Find
                Recipes" button to search for recipes based on the checked
                ingredients.
              </li>
              <li>
                Explore the recipes returned from the search by clicking on the
                recipe card on the left.
              </li>
              <li>
                Add recipes you liked from the search to your recipes collection
                by pressing "+" button on the right.
              </li>
              <li>Go to Recipes page to see your saved recipes.</li>
              <li>
                You can edit the recipes by double clicking on title,
                ingredients or instructions on the right.
              </li>
              <li>
                You can also add your own recipes with your custom images by
                clicking on "+" button from Recipes page.
              </li>
              <li>
                Finally, you can delete recipes you no longer want to keep by
                clicking on "trash" icon on the right.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </BasePage>
  );
}

export default AboutPage;
