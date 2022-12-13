import React from "react";
import PropTypes from "prop-types";
import Option from "./Option.jsx";
import "./OptionsList.css";
import LastOption from "./LastOption.jsx";

export default function OptionsList(props) {
  let i = 0;
  return (
    <ul id="possible-ingredients" className="custom-dropdown">
      {props.options.map((ingredient, i) => {
        if (i != props.options.length - 1) {
          i = i + 1;
          return (
            <li key={ingredient.id}>
              <Option
                key={ingredient.id}
                ingredient={ingredient}
                setIngredient={props.setIngredient}
                setFormData={props.setFormData}
                setOptions={props.setOptions}
                setBtnEnabled={props.setBtnEnabled}
              />
            </li>
          );
        } else {
          i = i + 1;
          return (
            <li key={ingredient.id}>
              <LastOption
                key={ingredient.id}
                ingredient={ingredient}
                setIngredient={props.setIngredient}
                setFormData={props.setFormData}
                setOptions={props.setOptions}
                setBtnEnabled={props.setBtnEnabled}
              ></LastOption>
            </li>
          );
        }
      })}
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
