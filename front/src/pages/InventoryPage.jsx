import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import OptionsList from "../components/ingredients/OptionsList.jsx";
import IngredientsTable from "../components/ingredients/IngredientsTable.jsx";
import Pagination from "./Pagination";
import { INGREDIENTS_PER_PAGE } from "../utils/utils.js";
import NoIngredientsBox from "../components/ingredients/NoIngredientsBox.jsx";

InventoryPage.propTypes = {
  setShowSearch: PropTypes.func,
  setIngredientsForSearch: PropTypes.func,
};

export default function InventoryPage(props) {
  const [formData, setFormData] = useState({
    item: "",
  });
  const [options, setOptions] = useState([]);
  const [ingredient, setIngredient] = useState({});
  const [btnEnabled, setBtnEnabled] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getMyIngredientsInventoryCount() {
      try {
        const response = await fetch("/api/myinventory/count");

        if (response.ok) {
          const { count } = await response.json();
          setCount(count);
        } else {
          console.error("Error in fetch api/myinventory/count");
        }
      } catch (e) {
        console.log({ error: e });
      }
    }
    getMyIngredientsInventoryCount();
  }, []);

  useEffect(() => {
    async function getMyIngredientsInventory() {
      try {
        console.log("currentPage", currentPage);
        const response = await fetch("/api/myinventory/?p=" + currentPage);

        if (response.ok) {
          const ingredientsJson = await response.json();
          console.log("ingredientsJson", ingredientsJson);
          setIngredients([...ingredientsJson]);
        } else {
          console.error("Error in fetch api/myinventory/");
        }
      } catch (e) {
        console.log({ error: e });
      }
    }
    getMyIngredientsInventory();
  }, [currentPage]);

  const handleCheckedChange = (event) => {
    setCheckedState((prevFormData) => {
      let updatedObj = {
        ...prevFormData,
        [event.target.name]: event.target.checked,
      };

      return updatedObj;
    });
  };

  async function deleteItem(itemId, itemName) {
    const deleteResponse = await fetch("api/myinventory/delete/" + itemId, {
      method: "DELETE",
    });
    if (deleteResponse.ok) {
      const getResponse = await fetch("/api/myinventory/?p=" + currentPage);
      if (getResponse.ok) {
        const ingredientsJson = await getResponse.json();
        //if deleted all ingredients from current page, need to go to previous page
        if (ingredientsJson.length === 0 && currentPage - 1 > 0) {
          setCurrentPage(currentPage - 1);
          const prevPageResponse = await fetch(
            "/api/myinventory/?p=" + currentPage
          );
          if (prevPageResponse.ok) {
            const prevPageIngedientsJson = await prevPageResponse.json();
            setIngredients([...prevPageIngedientsJson]);
          }
        } else {
          setIngredients([...ingredientsJson]);
        }
      }
    }

    setCheckedState((prevData) => {
      let updatedData = {
        ...prevData,
      };
      delete updatedData[itemName];
      return updatedData;
    });
    setCount(count - 1);
  }

  async function handleChange(event) {
    setFormData((prevFormData) => {
      let updatedObj = {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
      if (event.target.value.length < 3) {
        setOptions([]);
      }
      return updatedObj;
    });

    if (event.target.value.length > 2) {
      let res = await fetch(
        "/api/ingredients?" +
          new URLSearchParams({
            query: event.target.value,
          })
      );
      const items = await res.json();
      console.log("found ingredients", items);
      setOptions(items);
    }
  }

  async function addItem(ingredient) {
    console.log("adding ingredient", ingredient);
    // post
    const responseAddItem = await fetch("/api/myinventory/add", {
      method: "POST",
      body: JSON.stringify({ ingredient: ingredient }),
      headers: { "Content-Type": "application/json" },
    });
    if (responseAddItem.ok) {
      console.log("successfully added item to Inventory collection");
      return true;
    } else {
      console.error("Error in fetch /api/myinventory/add");
      return false;
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const addItemResponse = await addItem(ingredient);
    if (addItemResponse) {
      const getResponse = await fetch("/api/myinventory/?p=" + currentPage);
      if (getResponse.ok) {
        const ingredientsJson = await getResponse.json();
        console.log("got ingredientsJson", ingredientsJson);
        setIngredients([...ingredientsJson]);
        setCount(count + 1);
      }
    }
    setFormData({
      item: "",
    });
    setBtnEnabled(false);
  }
  console.log("checkedState", checkedState);
  const handleSearchSubmit = async () => {
    let ingredientsForSearch = [];
    Object.entries(checkedState).forEach(([key, value]) => {
      if (value) {
        ingredientsForSearch.push(key);
      }
    });

    // console.log("ingredientsForSearch", ingredientsForSearch);
    props.setIngredientsForSearch({ ingredients: ingredientsForSearch });
    props.setShowSearch(true);
  };
  return (
    <div className="container">
      <h1>Inventory</h1>
      <div>
        <h2 className="mb-4">Add Ingredient</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control mb-3"
                list="possible-ingredients"
                name="item"
                id="item"
                onChange={handleChange}
                value={formData.item}
                required
                placeholder="Enter ingredient"
                autoComplete="off"
              />
              <OptionsList
                setIngredient={setIngredient}
                setFormData={setFormData}
                setOptions={setOptions}
                setBtnEnabled={setBtnEnabled}
                options={options}
              />
            </div>
            <div className="col-2">
              <button
                type="submit"
                disabled={!btnEnabled}
                className="btn btn-custom btn-green"
              >
                {<i className="bi bi-plus-lg"></i>}
              </button>
            </div>
          </div>
        </form>
        <h2 id="myIngredients">My Ingredients</h2>
        {ingredients.length !== 0 && (
          <div>
            <div>
              <IngredientsTable
                deleteItem={deleteItem}
                ingredients={ingredients}
                handleCheckedChange={handleCheckedChange}
                handleSearchSubmit={handleSearchSubmit}
                checkedState={checkedState}
              />
            </div>
            <Pagination
              nPages={Math.ceil(count / INGREDIENTS_PER_PAGE)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
        {ingredients.length === 0 && <NoIngredientsBox></NoIngredientsBox>}
      </div>
    </div>
  );
}
