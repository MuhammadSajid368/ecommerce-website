const express = require('express')
const productRouter = express.Router()
const { filterProduct, getAllProducts, getCategoreyProduct, getCategoreyWiseProduct, getProductDetails, searchProduct, updateProduct, UploadProduct } = require('../controller/product/productController') 
const authToken = require('../middleware/authToken')

productRouter.post("/upload-product", UploadProduct)
productRouter.get("/get-products", getAllProducts)
productRouter.post("/update-product", authToken, updateProduct)
productRouter.get('/get-categoryProduct', getCategoreyProduct)
productRouter.post('/categorey-product', getCategoreyWiseProduct)
productRouter.post('/product-details', getProductDetails)
productRouter.get("/search", searchProduct)
productRouter.post("/filter-product", filterProduct)

module.exports = productRouter;