import React from "react";
import PropTypes from "prop-types";
import Ingredient from "./Ingredient.jsx";

IngredientsTable.propTypes = {
  ingredients: PropTypes.array,
  deleteItem: PropTypes.func,
  handleCheckedChange: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
};

export default function IngredientsTable(props) {
  return (
    <form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-2" scope="col">
              Image
            </th>
            <th className="col-6" scope="col">
              Ingredient
            </th>
            <th className="col-2" scope="col">
              Add item to search
            </th>
            <th className="col-1" scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {props.ingredients &&
            props.ingredients
              .sort((r1, r2) => r2.timestamp - r1.timestamp)
              .map((ingredient) => (
                <Ingredient
                  key={ingredient.id}
                  ingredient={ingredient}
                  handleClick={props.deleteItem}
                  handleCheckedChange={props.handleCheckedChange}
                  checkedState={props.checkedState}
                />
              ))}
        </tbody>
      </table>
      <button
        onClick={props.handleSearchSubmit}
        className="btn btn-custom btn-green mt-3"
      >
        Find Recipes
      </button>
    </form>
  );
}
