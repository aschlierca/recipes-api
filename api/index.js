const express = require("express");
const router = express.Router();

const recipesRouter = require("./recipes");
const reviewRouter = require("./review");

router.use("/recipes", recipesRouter);

router.use("/recipes", reviewRouter);
router.use("/reviews", reviewRouter);

module.exports = router;