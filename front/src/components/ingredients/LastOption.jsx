import React from "react";
import PropTypes from "prop-types";
import "./Option.css";

LastOption.propTypes = {
  ingredient: PropTypes.object,
  setIngredient: PropTypes.func,
  setFormData: PropTypes.func,
  setBtnEnabled: PropTypes.func,
  setOptions: PropTypes.func,
};

export default function LastOption(props) {
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
    </button>
  );
}
