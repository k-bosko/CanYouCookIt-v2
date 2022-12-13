import React from "react";
import "./Box-style.css";

export default function NoIngredientsBox() {
  return (
    <div className="box-style">
      Your ingredients will show up here once you have added ingredients to your
      inventory. You can add ingredients by typing into the search bar,
      selecting one of the ingredients from the prompt and then hit +Add button
      to include it in your inventory. Select ingredients you want to include
      and then Find recipes based on them!
    </div>
  );
}
