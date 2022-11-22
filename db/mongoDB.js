import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

function MongoModule() {
  const db = {};
  const url = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/";
  const DB_NAME = "CanYouCookIt";
  const COLLECTION_RECIPES = "recipes";
  const COLLECTION_MYRECIPES = "myrecipes";

  const MONGO_DEFAULTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  };

  /* ------Katerina----- */
  async function getRecipe(recipeId, userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = { id: recipeId, userId: userId };
      const recipe = await myRecipesCollection.findOne(query);
      return recipe;
    } finally {
      await client.close();
    }
  }

  async function checkRecipe(id) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const recipesCollection = mongo.collection(COLLECTION_RECIPES);

      const query = { id: id };
      const recipe = await recipesCollection.findOne(query);
      return recipe;
    } finally {
      await client.close();
    }
  }

  async function createRecipe(recipe) {
    recipe.id = String(recipe.id);
    recipe.timestamp = Date.now();

    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const result = await myRecipesCollection.insertOne(recipe);
      return result;
    } finally {
      await client.close();
    }
  }

  async function saveRecipe(recipe) {
    recipe.id = String(recipe.id);

    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const recipesCollection = mongo.collection(COLLECTION_RECIPES);

      const result = await recipesCollection.insertOne(recipe);
      return result;
    } finally {
      await client.close();
    }
  }

  async function addRecipe(recipe) {
    delete recipe._id;

    recipe._id = ObjectId();
    recipe.timestamp = Date.now();
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const result = await myRecipesCollection.insertOne(recipe);
      return result;
    } finally {
      await client.close();
    }
  }

  async function getRecipes(userId) {
    // console.log("got userId", userId);
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = { userId: userId };
      const recipes = await myRecipesCollection.find(query).toArray();

      return recipes;
    } finally {
      await client.close();
    }
  }

  async function deleteRecipe(recipeId, userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = {
        id: recipeId,
        userId: userId,
      };

      const result = await myRecipesCollection.deleteOne(query);
      return result;
    } finally {
      await client.close();
    }
  }

  async function updateRecipe(updatedRecipe, userId) {

    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const filter = { _id: ObjectId(updatedRecipe._id), userId: userId };
      delete updatedRecipe._id;
      const update = { $set: { ...updatedRecipe } };

      const result = await myRecipesCollection.updateOne(filter, update);
      return result;
    } finally {
      await client.close();
    }
  }

  async function checkUserImage(recipeId, image, userId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = { id: recipeId, userId: userId, image: image };
      const recipe = await myRecipesCollection.findOne(query);

      return recipe;
    } finally {
      await client.close();
    }
  }


  db.getRecipe = getRecipe;
  db.checkRecipe = checkRecipe;
  db.createRecipe = createRecipe;
  db.addRecipe = addRecipe;
  db.saveRecipe = saveRecipe;
  db.getRecipes = getRecipes;
  db.deleteRecipe = deleteRecipe;
  db.updateRecipe = updateRecipe;
  db.checkUserImage = checkUserImage;
  /* ------Katerina end----- */

  return db;
}

export default MongoModule();
