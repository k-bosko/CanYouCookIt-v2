import React from "react";
import PropTypes from "prop-types";
import Option from "./Option.jsx";
import "./OptionsList.css";

export default function OptionsList(props) {
  return (
    <ul id="possible-ingredients" className="custom-dropdown">
      {props.options.map((ingredient) => (
        <Option
          key={ingredient.id}
          ingredient={ingredient}
          setIngredient={props.setIngredient}
          setFormData={props.setFormData}
          setOptions={props.setOptions}
          setBtnEnabled={props.setBtnEnabled}
        />
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
