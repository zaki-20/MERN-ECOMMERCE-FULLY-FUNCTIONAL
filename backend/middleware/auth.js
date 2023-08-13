const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        next(new ErrorHandler("please login to access this resource", 401))
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decodeToken)
    req.user = await User.findById(decodeToken.id)
    // console.log(req.user)
    next()


})