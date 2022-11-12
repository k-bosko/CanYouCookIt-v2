import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage.jsx";
import RecipesPage from "./recipes/RecipesPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/recipes" exact element={<RecipesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
