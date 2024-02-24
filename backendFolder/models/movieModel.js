const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
    {
        // user_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "User"
        // },
        name: {
            type: String,
            required: [true, "Please add the movie name"]
        },
        location: {
            type: String,
            required: [true, "Please add the Location of Movie theater"],
        },
        timings: {
            type: String,
            required: [true, "Please add the Timings of the show"]
        },
        description: {
            type: String,
            required: [true, "Please add the Description"]
        },
        trailer_link: {
            type: String,
        },
        cast_crew: {
            type: String,
        },
        totalSeats: {
            type: Number,
            required: [true, "Please add the total number of seats available"]
        },
        availSeats: {
            type: Number,
            required: [true]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Movie", movieSchema)