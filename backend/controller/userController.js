const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken")


//create user with jwt
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        }
    })

    // const token = user.getJWTToken()

    // res.status(201).json({
    //     success: true,
    //     token
    // })
    sendToken(user, 201, res)

})

//login user 
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //check if user gives emailand password both
    if (!email || !password) {
        next(new ErrorHandler("please enter username and password", 400))
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        next(new ErrorHandler("invalid email or password", 401))
    }

    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        next(new ErrorHandler("invalid email or password", 401))
    }

    // const token = user.getJWTToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })
    sendToken(user, 200, res)

})