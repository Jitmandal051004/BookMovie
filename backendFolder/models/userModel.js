const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add an username"]
        },
        email: {
            type: String,
            required: [true, "Please add your EmailId"]
        },
        password: {
            type: String,
            required: [true, "Please add Password"]
        },
        userType: {
            type: String,
            enum: ["userN"]
        },
        movieBooked: {
            movie_id: {
                type: String,
                required: [true]
            },
            name: {
                type: String,
                required: [true]
            },
            timeOfShow: {
                type: String,
                required: [true]
            },
            timeBooked: {
                type: String,
                required: [true]
            },
            numBookedSeats: {
                type: String,
                required: [true]
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema)