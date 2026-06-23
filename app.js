const express = require("express");
const apiRouter = require("./api");

const app = express();

app.use(express.json());

function logOriginalURL(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}

function logMethod(req, res, next) {
    console.log('Request type:', req.method);
    next();
}

function errorHandler(err, req, res, next) {
    console.error(err);
    res.sendStatus(500);
}

app.use(logOriginalURL, logMethod);

// First Route
app.get("/", (req, res) => {
    res.send("Recipes API is running");
});

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});