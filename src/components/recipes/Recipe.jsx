import React, { useState } from "react";
import PropTypes from "prop-types";

Recipe.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  uuid: PropTypes.string,
  onClick: PropTypes.func,
  isMyRecipesPage: PropTypes.bool,
};

function Recipe(props) {
  const [isMouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }
  
  return (
    <div
      className="card me-5 mb-5"
      style={{
        border: isMouseOver ? "1px solid red" : "1px solid lightgrey",
        width: "15rem",
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() =>
        props.onClick(props.isMyRecipesPage ? props.uuid : props.id)
      }
    >
      <div className="card-body">
        <img src={props.image} alt={props.title} className="recipe-img mb-4" />
        <h5 className="card-title recipe-title">
          {props.title.length > 30
            ? props.title.substring(0, 30) + "..."
            : props.title}
        </h5>
      </div>
    </div>
  );
}

export default Recipe;
