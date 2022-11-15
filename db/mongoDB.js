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
  async function getRecipe(id) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const recipesCollection = mongo.collection(COLLECTION_RECIPES);

      const query = { id: id };
      const detail = await recipesCollection.findOne(query);
      return detail;
    } finally {
      await client.close();
    }
  }

  async function createRecipe(recipe) {
    console.log("got recipe", recipe);
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const recipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const result = await recipesCollection.insertOne(recipe);
      return result;
    } finally {
      await client.close();
    }
  }

  async function saveRecipe(recipeId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      //TODO change to real userId when users implemented
      const userId = "637314759f3b63df03cb0055";

      const query = {
        _id: ObjectId(userId),
      };

      const append = {
        $addToSet: {
          recipeId: recipeId,
        },
      };

      const result = await myRecipesCollection.updateOne(query, append);
      return result;
    } finally {
      await client.close();
    }
  }

  async function getRecipes(userId) {
    console.log("got userId", userId);
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      const query = { _id: ObjectId(userId) };
      const options = { projection: { _id: 0, recipeId: 1 } };
      const recipeIds = await myRecipesCollection.findOne(query, options);

      return recipeIds;
    } finally {
      await client.close();
    }
  }

  async function deleteRecipe(recipeId) {
    let client;

    try {
      client = new MongoClient(url, MONGO_DEFAULTS);
      await client.connect();
      console.log("Connected to Mongo Server");

      const mongo = client.db(DB_NAME);
      const myRecipesCollection = mongo.collection(COLLECTION_MYRECIPES);

      //TODO change to real userId when users implemented
      const userId = "637314759f3b63df03cb0055";

      const query = {
        _id: ObjectId(userId),
      };

      const deleteFromArray = {
        $pull: { recipeId: recipeId },
      };

      const result = await myRecipesCollection.updateOne(
        query,
        deleteFromArray
      );
      return result;
    } finally {
      await client.close();
    }
  }

  db.getRecipe = getRecipe;
  db.createRecipe = createRecipe;
  db.saveRecipe = saveRecipe;
  db.getRecipes = getRecipes;
  db.deleteRecipe = deleteRecipe;
  /* ------Katerina end----- */

  return db;
}

export default MongoModule();
