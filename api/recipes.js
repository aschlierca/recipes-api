const express = require("express");
const router = express.Router();


let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;

function checkTitleCuisine(req, res, next) {
    const { title, cuisine } = req.body;

    if (!title || !cuisine) {
        return res.status(400).json({ message: "Title and Cuisine required"})
    }

    next();
}

// GET All
router.get("/", (req, res, next) => {
    try {
        res.json(recipes);
    } catch (err) {
        next(err);
    }
});

// GET by Id
router.get("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const recipe = recipes.find((recipe) => recipe.id === id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (err) {
        next(err);
    }
})

// POST
router.post("/", checkTitleCuisine, (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
});

// PATCH
router.patch("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const recipe = recipes.find((recipe) => recipe.id === id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found " });
        }

        Object.assign(recipe, req.body);

        res.status(200).json(recipe);
    } catch (err) {
        next(err);
    }
});

// DELETE
router.delete("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

        if (recipeIndex === -1) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        recipes.splice(recipeIndex, 1);

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;