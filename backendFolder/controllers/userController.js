const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /api/users/register
//@access public 
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields starred fields are mandatory");
    }
    
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exist");
    }

    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        userType: "userN"
    });

    if(user){
        res.status(201).json({_id: user.id, email: user.email });
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
})

//@desc Login user
//@route POST /api/users/login
//@access public 



//@desc Current user info
//@route POST /api/users/current
//@access private


module.exports = {
    registerUser
}