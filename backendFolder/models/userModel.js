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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema)