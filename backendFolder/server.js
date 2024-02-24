const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/movies", require("./routes/movieRoutes"));
// app.use("")

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});