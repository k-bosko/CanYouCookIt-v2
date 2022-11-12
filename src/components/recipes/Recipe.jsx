import React from "react";
import PropTypes from "prop-types";

Recipe.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};

function Recipe(props) {
  return (
    <div className="card me-5 mb-5" style={{ width: "15rem" }}>
      {console.log("here", props.title)}
      <div className="card-body">
        <img
          src={props.image}
          alt={props.title}
          className="recipe-img mb-4"
        />
        <h5 className="card-title recipe-title">{props.title}</h5>
      </div>
    </div>
  );
}

export default Recipe;
