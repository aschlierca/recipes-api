const express = require("express");
const router = express.Router();

let reviews = [
  { id: 1, recipeId: 1, reviewer: "Sam", rating: 5, comment: "Restaurant quality." },
  { id: 2, recipeId: 1, reviewer: "Priya", rating: 4, comment: "Good but a little salty." },
  { id: 3, recipeId: 2, reviewer: "Alex", rating: 5, comment: "My new go-to." },
];

let nextReviewId = 4;

// GET
router.get("/:recipeId/reviews", (req, res, next) => {
    try {
        const recipeId = Number(req.params.recipeId);
        const recipeReviews = reviews.filter((review) => review.recipeId === recipeId);

        res.json(recipeReviews);
    } catch (err) {
        next(err);
    }
});

// POST
router.post("/:recipeId/reviews", (req, res, next) => {
    try {
        const { reviewer, rating, comment } = req.body;

        const newReview = {
            id: nextReviewId++,
            reviewer,
            rating,
            comment,
        };

        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating is not a number between 1 and 5" });
        }
        reviews.push(newReview);

        res.status(201).json(newReview);
    } catch (err) {
        next(err);
    }
})

// DELETE
router.delete("/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const reviewIndex = reviews.findIndex((review) => review.id === id);

        if (reviewIndex === -1) {
            res.sendStatus(404).json({ message: "Review not found" });
        }

        reviews.splice(reviewIndex, 1);
        res.sendStatus(204);

    } catch (err) {
        next(err);
    }
});

module.exports = router;