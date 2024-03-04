const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public 
const registerAdmin = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields starred are mandatory");
    };

    const adminAvailable = await Admin.findOne({email});
    if(adminAvailable){
        res.status(400);
        throw new Error("Admin already exist");
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);
    const admin = await Admin.create({
        username,
        email,
        password: hashedPassword,
        userType: "admin"
    });

    if(admin){
        res.status(201).json({_id: admin.id, email: admin.email });
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
})

//@desc Login user
//@route POST /api/users/login
//@access public 
const loginAdmin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields starred fields are mandatory");
    }

    const admin = await Admin.findOne({email});
    if(admin && (await bcrypt.compare(password, admin.password))){
        const accessToken = jwt.sign({
            admin: {
                username: admin.username,
                email: admin.email,
                id: admin.id,
                userType: admin.userType
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "120m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
})

//@desc Current user info
//@route POST /api/users/current
//@access 
const currentAdmin = asyncHandler(async (req,res) => {
    res.status(200).json(req.admin);
})

module.exports = {
    registerAdmin,
    loginAdmin,
    currentAdmin
}