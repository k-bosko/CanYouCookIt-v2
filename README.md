# Can You Cook It?

**Authors**: Anshul Mathew, Katerina Bosko

This is the second release of [CanYouCookItApp](https://github.com/Anchellon/CanYouCookIt), in which we updated design, fixed accessibility and functionality based on usability studies. 

## Class Link

The project is part of the [CS5610 Web Development](http://localhost:3000/https://johnguerra.co/classNamees/webDevelopment_fall_2022/) at the Northeastern University.

## Project Objective

Say you would like to cook something but you don't know what to cook with the ingredients available at his home. CanYouCookIt app allows you to find recipes based on the ingredients you have at home. It allows you to keep a track of the ingredients and save recipes that you find interesting. It enables search based on the ingredients you want to use.

## Deliverables

[**Usability Report**](https://docs.google.com/document/d/1ThoJQnZJ5ll2eEVFgHruJ-CFfHQowG134fEzcR19KhM/edit#)(also in deliverables folder)

[**Design mockups & User Personas**](https://docs.google.com/document/d/1CRxxexZEyCP16yBf4R0G67XXxpC9m1gJHOS_grpqLhQ/) (also in deliverables/v1 folder)

[**Deployed app**](https://canyoucookit-v2.onrender.com)

[**Presentation slides**](https://docs.google.com/presentation/d/16QrTi0ZzCHL-F4oSqd8V9Q6LkrJpMMOsRDTtxmA4UsI) (also in deliverables folder)

[**Video Walkthrough**](https://youtu.be/0HpHNkHyxaM)

## Screenshots
Homepage

<img src=https://github.com/k-bosko/CanYouCookIt-v2/blob/main/deliverables/screenshots/homepage.png width=700 >

Inventory page

<img src=https://github.com/k-bosko/CanYouCookIt-v2/blob/main/deliverables/screenshots/inventory-page.png width=700 >

Search Results page

<img src=https://github.com/k-bosko/CanYouCookIt-v2/blob/main/deliverables/screenshots/search-results.png width=700 >

Create New Recipe

<img src=https://github.com/k-bosko/CanYouCookIt-v2/blob/main/deliverables/screenshots/create-recipe.png  width=700 >

My Recipes Page

<img src=https://github.com/k-bosko/CanYouCookIt-v2/blob/main/deliverables/screenshots/myrecipes-page.png  width=700 >

Update Recipe Page

<img src=https://github.com/k-bosko/CanYouCookIt-v2/blob/main/deliverables/screenshots/update-recipe.png  width=700 >


## Features

- Add ingredients to your inventory
- Provide ingredients' suggestions as you type items you want to find in the search bar
- You can delete items from the inventory if you are out of stock
- View your current stash of food items
- Search for recipes based on food items you own
- Save recipes that you like to your recipes collection
- Create your own recipes
- Update any recipe in your collection (including those that you saved from the search!)

## Tech

Our App uses a number of open source projects to work properly:

- Node.js
- Express.js
- Bootstrap
- HTML/CSS
- MongoDB
- Docker
- React

## Using the app

We use external API - [Spoonacular](https://spoonacular.com/) - to find the recipes and there are only 150 API calls for free per day. If the limit is depleted, please come back next day.

How to use the app:

1. Start adding ingredients on Inventory page. To enable the “+” button, you must select an ingredient from the dropdown menu.
2. Update your ingredient’s list by deleting ingredients you no longer have by clicking on “trash” icon button
3. Use checkbox to add ingredients to the search and press “Find Recipes” button to search for recipes based on the checked ingredients.
4. Explore the recipes returned from the search by clicking on the recipe card on the left.
5. Add recipes you liked from the search to your recipes collection by pressing “+” button on the right.
6. Go to Recipes page to see your saved recipes.
7. There are two ways to edit a recipe: 
- by double clicking on title, ingredients or instructions 
- by clicking on "Edit Recipe" button on the right
8. You can also add your own recipes with your custom images by clicking on “+” button from Recipes page.
9. Finally, you can delete recipes you no longer want to keep by clicking on “trash” icon on the right. A dialog window will appear asking you to confirm deletion.

## Installation

### Setting up the database

For the database CanYouCookIt uses MongoDB in the backend. To set it up run the following commands

```
docker run --name mongodb -d -p 27017:27017 -v YOUR_LOCAL_DIR:/data/db mongo
```

Using this method, you will be able to connect to your MongoDB instance on mongodb://localhost:27017. You can try it with Compass, MongoDB’s GUI to visualize and analyze your data.
Don't forget to shut down the docker instance after use.

### Setting up the servers

CanYouCookIt requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the back end-server.

```
cd CanYouCookIt
npm i
```

You can intialize the database by running the following commands

```
npm run initializeDB
```

You can setup the front-end server by running the following commands

```
npm run postinstall
```

### Getting an API key 
To enable search recipes by ingredients functionality on local machine, sign up with our external API provider - [Spoonacular](https://spoonacular.com/) - - to get the API key.
Visit https://spoonacular.com/food-api/pricing and choose free tier.

### Running the project

Run the following command from the root directory of the project to spin up the project's back-end server in a new terminal. Substitute **{your-api-key}** with your API key string.

```
API_key={your-api-key} npm run nodemon
```

To start the front-end server, you can run the following commands in a new terminal

```
cd front
npm run start
```

Open up a browser and navigate to `http://localhost:3000/`

**Enjoy!**

## License

MIT
**Free Software, Hell Yeah!**
