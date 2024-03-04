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
            //has to be changed to mongoose.schema
            movie_id: {
                type: String,
            },
            name: {
                type: String,
            },
            timeOfShow: {
                type: String,
            },
            timeBooked: {
                type: String,
            },
            numBookedSeats: {
                type: String,
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema)