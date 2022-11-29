import React from "react";
import PropTypes from "prop-types";
import "./OptionsList.css";

export default function OptionsList(props) {
  return (
    <ul id="possible-ingredients" className="custom-dropdown">
      {props.options.map((ingredient) => (
        <div>
          <span
            key={ingredient.id}
            className="dropdown-content dropdown-elem"
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
