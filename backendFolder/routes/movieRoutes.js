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
    const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getAllMovies).post(createMovie);
router.route("/:id").get(getMovie).put(putRequest).delete(validateToken, deleteMovie);

module.exports = router;