import React from "react";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <img
          src="/images/logo.png"
          className="ps-4 pb-1 ms-3"
          alt="can-you-cook-it-logo"
          height="45"
        />
        <a className="navbar-brand ps-3 mt-2" href="/">
          CanYouCookIt?
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-item nav-link active" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-item nav-link" href="/ingredients.html">
                Ingredients
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-item nav-link" href="/recipes.html">
                Recipes
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
