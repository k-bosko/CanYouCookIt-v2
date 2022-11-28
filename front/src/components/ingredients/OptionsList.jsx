import React from "react";
import PropTypes from "prop-types";

export default function OptionsList(props) {
  let element = {
    display: "inline-block",
    "margin-top": "-12px",
    "margin-bottom": "-12px",
  };
  let elementStyle = {
    position: "absolute",
    width: "inherit",
    padding: "0px",
  };
  return (
    <ul id="possible-ingredients" style={elementStyle}>
      {props.options.map((ingredient) => (
        <div>
          <span
            key={ingredient.id}
            className="dropdown-content"
            style={element}
            onClick={() => {
              props.setIngredient(ingredient);
              props.setFormData({ item: ingredient.name });
              props.setOptions([]);
              props.setBtnEnabled(true);
            }}
          >
            {ingredient.name}
          </span>
          <br></br>
          <br></br>
        </div>
      ))}
    </ul>
  );
}
OptionsList.propTypes = {
  setIngredient: PropTypes.func,
  setFormData: PropTypes.func,
  setBtnEnabled: PropTypes.func,
  setOptions: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};
