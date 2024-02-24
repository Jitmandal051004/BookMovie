const express = require("express");
const router = express.Router();
const {
    getMovie,
    createMovie,
    getAllMovies,
    putRequest,
//    updateMovie,
//    bookMovie,
//    cancelMovie,
    deleteMovie} = require("../controllers/moviesController");

router.route("/").get(getAllMovies).post(createMovie);
router.route("/:id").get(getMovie).put(putRequest).delete(deleteMovie);

module.exports = router;