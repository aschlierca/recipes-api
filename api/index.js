const express = require("express");
const router = express.Router();

const recipesRouter = require("./recipes");

router.use("/recipes", recipesRouter);

module.exports = router;