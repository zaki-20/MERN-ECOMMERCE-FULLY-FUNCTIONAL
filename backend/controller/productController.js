const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

//create product --admin
exports.createProduct = catchAsyncErrors( async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({  
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
   
    if (!products || products.length === 0) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      success: true,
      products,
    });
  });

//get product details
exports.getProductDetails = catchAsyncErrors(  async (req, res, next) => {
    
      const product = await Product.findById(req.params.id);
      // console.log('Product ID:', req.params.id);
      // console.log('Product:', product);
      if (!product) {
        return next(new ErrorHandler("product not found", 404));
      }
      res.status(200).json({
        success: true,
        product,
      });
  });

//update products
exports.updateProduct = catchAsyncErrors(  async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product
exports.deleteProduct =  catchAsyncErrors (async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product has been deleted ",
  });
});
