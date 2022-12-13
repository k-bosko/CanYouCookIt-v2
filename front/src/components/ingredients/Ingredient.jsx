import React from "react";
import PropTypes from "prop-types";
import "./Ingredient.css";

export default function Ingredient(props) {
  return (
    <tr>
      <td>
        <img
          id={props.ingredient.id}
          src={props.ingredient.url}
          className="ingredient-img"
          alt={props.ingredient.url}
        />
      </td>
      <td>
        <label htmlFor={props.ingredient.name} className="py-5 px-2">
          {props.ingredient.name}
        </label>
      </td>
      <td>
        {console.log(
          "checkedstate of ingredient",
          props.checkedState[props.ingredient.name]
        )}
        <div className="py-5 px-4">
          <input
            type="checkbox"
            id={props.ingredient.name}
            name={props.ingredient.name}
            onChange={props.handleCheckedChange}
            defaultChecked={props.checkedState[props.ingredient.name]}
          />
        </div>
      </td>
      <td>
        <div className="py-5 px-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              props.handleClick(props.ingredient.id, props.ingredient.name);
            }}
          >
            X
          </button>
        </div>
      </td>
    </tr>
  );
}

Ingredient.propTypes = {
  handleClick: PropTypes.func,
  handleCheckedChange: PropTypes.func,
  ingredient: PropTypes.object,
};
