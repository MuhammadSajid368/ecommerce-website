const express = require('express')
const cartRouter= express.Router()
const authToken = require("../middleware/authToken")
const {addToCart, countAddToCartProduct, addToCartViewProduct, deleteAddToCartProduct, updateAddToCartProduct } = require('../controller/cart/cartController')

cartRouter.post('/addtocart', authToken, addToCart)
cartRouter.get("/countAddToCartProduct",authToken, countAddToCartProduct)
cartRouter.get("/view-card-product",authToken, addToCartViewProduct)
cartRouter.post("/delete-cart-proudct", authToken,deleteAddToCartProduct)
cartRouter.post("/update-cart-product", authToken, updateAddToCartProduct)
module.exports= cartRouter;