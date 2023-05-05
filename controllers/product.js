const Product = require('../models/product');

exports.addProduct = async (req, res, next) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    try {
        await Product.find({ name: name });
        const product = new Product({
            name: req.body.name,
            quantity: req.body.quantity
        });
        await product.save();
        res.status(201).json({
            message: "Product Created Successfully",
            product: product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

exports.getProducts = async (req, res, next) => {
    try{
        const products = await Product.find();
        res.status(200).json({
            message: "Products Fetched Successfully",
            products: products
        })
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}