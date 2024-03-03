const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide an username"]
        },
        email: {
            type: String,
            required: [true, "Please provide your EmailID"]
        },
        password: {
            type: String,
            required: [true, "Please add Password"]
        },
        userType: {
            type: String,
            enum : ["admin"]
        }
        // location: {
        //     type: String,
        //     required: [true, "Please provide your location"]
        // }
    },
    {
        timeStamps: true
    }
);

module.exports = mongoose.model("Admin", adminSchema);