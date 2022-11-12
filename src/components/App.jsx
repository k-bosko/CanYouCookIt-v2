import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import RecipesPage from "./recipespage/RecipesPage";

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
