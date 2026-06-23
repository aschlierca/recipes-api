const express = require("express");

const app = express();

app.use(express.json());

let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;

// First Route
app.get("/", (req, res) => {
    res.send("Recipes API is running");
});

// GET All
app.get("/api/recipes", (req, res) => {
    res.json(recipes);
});

// GET by Id
app.get("/api/recipes/:id", (req, res) => {
    const id = Number(req.params.id);

    const recipe = recipes.find((recipe) => recipe.id === id);

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
})

// POST
app.post("/api/recipes", (req, res) => {
    const { title, cuisine, minutes, servings, vegetarian } = req.body;

    const newRecipe = {
        id: nextId,
        title,
        cuisine,
        minutes,
        servings,
        vegetarian,
    };

    nextId += 1;
    recipes.push(newRecipe);

    res.status(201).json(newRecipe);
});

// PATCH
app.patch("/api/recipes/:id", (req, res) => {
    const id = Number(req.params.id);

    const recipe = recipes.find((recipe) => recipe.id === id);

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found " });
    }

    Object.assign(recipe, req.body);

    res.status(200).json(recipe);
});

// DELETE
app.delete("/api/recipes/:id", (req, res) => {
    const id = Number(req.params.id);

    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

    if (recipeIndex === -1) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    recipes.splice(recipeIndex, 1);

    res.sendStatus(204);
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});




