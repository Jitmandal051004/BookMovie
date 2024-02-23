const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel")

//@desc Get all movies
//@route GET /api/movies
//@access public
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({user_id: req.user.id});
    res.status(200).json(movies);
})


//@desc create movies
//@route CREATE /api/movies
//@access private 
const createMovie = asyncHandler(async (req,res) => {
    console.log("The request body is :", req.body);
    const {name, location, timings, description, trailer_link, cast_crew, availSeats, leftSeats} = req.body;
    if (!name || !location || !timings || !description || !availSeats || !leftSeats){
        res.status(400);
        throw new Error("All fields starred fields are mandatory");
    } // write the receiving contact format.
})


//@desc Get contact
//@route GET /api/contacts/:id
//@access private


//@desc update contact
//@route UPDATE /api/contacts/:id
//@access private 


//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private  

module.exports = {
    getAllMovies,
}