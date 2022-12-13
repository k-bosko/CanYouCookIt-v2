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
        <div >{props.ingredient.name}</div>
      </td>
      <td>
        {console.log("checkedstate of ingredient", props.checkedState[props.ingredient.name])}
        <div>
          <input
            type="checkbox"
            id="flexCheckDefault"
            name={props.ingredient.name}
            onChange={props.handleCheckedChange}
            defaultChecked={props.checkedState[props.ingredient.name]}
          />
        </div>
      </td>
      <td>
        <div>
          <button
            type="button"
            aria-label="delete-button"
            className="btn btn-custom btn-red"
            onClick={() => {
              props.handleClick(props.ingredient.id, props.ingredient.name);
            }}
          >
            <i className="bi bi-trash3"></i>
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
