const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel");

//@desc create movies
//@route CREATE /api/movies
//@access private 
//@userType Admin
const createMovie = asyncHandler(async (req,res) => {
    const userN = req.user;
    const admin = req.admin;
    if(userN){
        res.status(401);
        throw new Error("Normal User not authorized")
    }

    if(admin){
        console.log("The request body is :", req.body);
        const {name, location, timings, description, trailer_link, cast_crew, totalSeats, availSeats} = req.body;
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
            admin_id: admin.id
        })

        res.status(201).json(movie);
    }
})

//@desc Get all movies
//@route GET /api/movies
//@access public
//@userType All
//{user_id: req.user.id}
const getAllMovies = asyncHandler(async (req, res) => {
    const userN = req.user;
    const admin = req.admin;
    if(admin){
        const movies = await Movie.find({admin_id: admin.id});
        res.status(200).json(movies);
    }else if(userN){
        const movies = await Movie.find();
        res.status(200).json(movies);
    }
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

//@desc delete movie
//@route DELETE /api/movies/:id
//@access private 
//@userType Admin
const deleteMovie = asyncHandler(async (req, res) => {
    const userN = req.user;
    const admin = req.admin;

    if(userN){
        res.status(403);
        throw new Error("User don't have permission to delete Movie details");
    }

    if(movie.admin_id.toString() !== admin.id){
        res.status(403);
        throw new Error("User don't have permission to delete Movie details");
    }

    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404);
        throw new Error("Movie not found");
    }
    if(movie.availSeats !== movie.totalSeats){
        await Movie.deleteOne({_id: req.params.id });
        res.status(200).json(movie);
    }
    
}) 

//@desc type of Put Request
//@route REQUEST /api/movies/:id
//@access private
const putRequest = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        res.status(404);
        throw new Error("Movie not found");
    }
    const action = req.body.action;
    const userN = req.user;
    const admin = req.admin;

    if(userN){
        if (action === 'book') {
            bookSeat(req, res);
        } else if (action === 'cancel') {
            cancelSeat(req, res);
        } else {
            res.status(400);
            throw new Error("Invalid Action");
        }
    }else if(admin){
        if(action == 'update'){
            updateMovie(req, res);
        }else {
            res.status(400);
            throw new Error("Invalid Action");
        }
    }else{
        res.status(401).json({ error: 'User not Authorized' });
    }
    
})

//@desc update Movie
//@route UPDATE /api/movies/:id
//@access private
//@userType Admin 
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if(movie.admin_id.toString() !== req.admin.id){
        res.status(401);
        throw new Error("User don't have permission to update Movie details");
    }

    const updateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true }
    )

    res.status(200).json(updateMovie);
})

//@desc Book movie
//@route Book /api/movies/:id
//@access private 
//@userType User
const bookSeat = asyncHandler(async (req, res) => {
    const userN = req.user;
    const movie = await Movie.findById(req.params.id);

    const seatToBook = req.body.seatToBook;
    if(!seatToBook){
        res.status(404);
        throw new Error("Please specify the number of seats to be booked");
    }

    if(seatToBook > 4){
        res.status(403);
        throw new Error("Booking more than 4 seats is forbidden");
    }

    const bookSeat = await Movie.findByIdAndUpdate(
        req.params.id,
        {$inc: {availSeats: -seatToBook}},
        {new : true}
    );

    let availSeats = await movie.availSeats;
    if(availSeats < 0){
        const currentSeats = await Movie.findByIdAndUpdate(
            req.params.id,
            {$inc: {availSeats: -seatToBook}},
            {new : true}
        );
        res.status(403).json(currentSeats);
        throw new Error("Maximum Seat crossed");
    }

    userN.movieBooked = {
        movie_id: movie.id,
        name: movie.name,
        timeOfShow: movie.timings,
        timeBooked: movie.updatedAt,
        numBookedSeats: seatToBook
    }

    console.log("movie has been booked");
    res.status(200).json(bookSeat);
})

//@desc Cancel Booked movie
//@route Cancel /api/movies/:id
//@access private 
//@userType User
const cancelSeat = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    const seatToCancel = req.body.seatToCancel;
    if(!seatToCancel){
        res.status(404);
        throw new Error("Please specify the number of seats to be canceled");
    }

    const cancelSeat = await Movie.findByIdAndUpdate(
        req.params.id,
        {$inc: {availSeats: seatToCancel}},
        {new : true}
    );

    let availSeats = await movie.availSeats;
    const totalSeats = await movie.totalSeats;
    if(availSeats >= totalSeats){
        const currentSeat = await Movie.findByIdAndUpdate(
            req.params.id,
            {$inc: {availSeats: -seatToCancel}},
            {new : true}
        );
        res.status(403).json(currentSeat);
        throw new Error("Maximum Seat crossed");
    }

    console.log("movie has been cancelled");
    res.status(200).json(cancelSeat);
})

module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    putRequest,
    deleteMovie,
}