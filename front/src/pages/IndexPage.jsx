import React from "react";
import { Link } from "react-router-dom";
import BasePage from "./BasePage.jsx";

IndexPage.propTypes = {};

function IndexPage() {
  return (
    <BasePage>
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="./images/tomato_pie.jpeg"
              class="d-block mx-lg-auto img-fluid"
              alt="tomato pie"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-5">CanYouCookIt</h1>
            <p class="lead">
              Quickly find the matching recipes based on the
              list of ingredients you have at home.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link className="btn btn-custom btn-green mt-4" to="/inventory">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}

export default IndexPage;
