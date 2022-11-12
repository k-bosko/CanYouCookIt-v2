import React from "react";

//TODO refactor Main with props and smaller components?
function Main() {
  return (
    <main>
      <div className="container">
        <h1>Welcome to CanYouCookIt app!</h1>
        <div className="row">
          <div className="col-7">
            <p>
              CanYouCookIt helps you to find the matching recipes based on the
              list of ingredients you have at home.
            </p>
            <p>
              The app was built using React + Express.js + MongoDB +
              HTML5/Bootstrap. Its current version does not support user
              authentication.
            </p>
            <p>
              The project is part of the{" "}
              <a href="https://johnguerra.co/classNamees/webDevelopment_fall_2022/">
                CS5610 Web Development
              </a>{" "}
              at the Northeastern University.
            </p>
          </div>
          <div className="col-5">
            <div className="col-md-12 pt-5 text-center">
              <button
                className="btn btn-start"
                type="button"
                //TODO fix onClick
                //react-dom.development.js:86 Warning: Expected `onClick` listener to be a function, instead got a value of `string` type.
                onClick="location.href='/ingredients.html'"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
