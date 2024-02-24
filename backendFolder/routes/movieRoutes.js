const express = require("express");
const router = express.Router();
const {
    getMovie,
    createMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
//     bookMovie,
//     cancelMovie 
    } = require("../controllers/moviesController");

router.route("/").get(getAllMovies).post(createMovie);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;