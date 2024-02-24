const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel")

//@desc Get all movies
//@route GET /api/movies
//@access public
//@userType All
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({user_id: req.user.id});
    res.status(200).json(movies);
})


//@desc create movies
//@route CREATE /api/movies
//@access private 
//@userType Admin
const createMovie = asyncHandler(async (req,res) => {
    console.log("The request body is :", req.body);
    const {name, location, timings, description, trailer_link, cast_crew, availSeats, totalSeats} = req.body;
    if (!name || !location || !timings || !description || !totalSeats || !availSeats){
        res.status(400);
        throw new Error("All fields starred fields are mandatory");
    }

    const movie = await Movie.create({
        name,
        location, 
        timings, 
        description, 
        trailer_link, 
        cast_crew, 
        totalSeats,
        availSeats, 
    })

    res.status(201).json(movie);
})


//@desc Get Movie
//@route GET /api/movies/:id
//@access private
//@userType All
const getMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404);
        throw new Error("Movie not found");
    }
    res.status(200).json(movie);
})


//@desc update Movie
//@route UPDATE /api/movies/:id
//@access private
//@userType Admin 
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404);
        throw new Error("Movie not found");
    }

    if(movie.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update Movie details");
    }

    const updateMovie = await Movie.findByIdAndUpdated(
        req.params.id,
        req.body,
        { new : true }
    )

    res.status(200).json(updateMovie);
})


//@desc delete movie
//@route DELETE /api/movies/:id
//@access private 
//@userType Admin
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404);
        throw new Error("Movie not found");
    }

    if(movie.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update Movie details");
    }

    await Movie.deleteOne({_id: req.params.id });
    res.status(200).json(updateMovie);
}) 

//@desc Book movie
//@route Book /api/movies/:id
//@access private 
//@userType User
const bookMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404);
        throw new Error("Movie not found");
    }

    //we have to still verify that the user_type matches with User

    const bookMovie = await Movie.findByIdAndUpdated(
        req.params.id,
        {$inc: {availSeats: 1}},
        {new : true}
    );
    console.log("movie has been booked");
    res.status(200).json(bookMovie);
})

//@desc Cancel Booked movie
//@route Cancel /api/movies/:id
//@access private 
//@userType User
const cancelMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404);
        throw new Error("Movie not found");
    }

    //we have to still verify that the user_type matches with User

    const cancelMovie = await Movie.findByIdAndUpdated(
        req.params.id,
        {$inc: {availSeats: -1}},
        {new : true}
    );
    console.log("movie has been cancelled");
    res.status(200).json(cancelMovie);
})

module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    bookMovie,
    cancelMovie
}