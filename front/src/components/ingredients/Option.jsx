import React from "react";
import PropTypes from "prop-types";
import "./Option.css";

Option.propTypes = {
  ingredient: PropTypes.object,
  setIngredient: PropTypes.func,
  setFormData: PropTypes.func,
  setBtnEnabled: PropTypes.func,
  setOptions: PropTypes.func,
};

export default function Option(props) {
  return (
    <button
      className="dropdown-content dropdown-elem"
      onClick={() => {
        props.setIngredient(props.ingredient);
        props.setFormData({ item: props.ingredient.name });
        props.setOptions([]);
        props.setBtnEnabled(true);
      }}
    >
      {props.ingredient.name}
      <br></br>
      <br></br>
    </button>
  );
}
