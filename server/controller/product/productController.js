const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

const UploadProduct = async (req, res) => {
    try {
        const sessionUserId = req.userId;
        const hasPermission = await uploadProductPermission(sessionUserId);
        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false,
            });
        }

        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
};

const getAllProducts = async (req, res) => {
    try {

        const allProduct = await productModel.find().sort({ createdAt: -1 })
        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allProduct
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission Denied")
        }

        const { _id, ...resBody } = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "Product Updated Successfully",
            data: updateProduct,
            success: true,
            error: false
        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

const getCategoreyProduct = async (req, res) => {
    try {
        const productCategorey = await productModel.distinct("categorey");


        const productByCategorey = [];

        for (const categorey of productCategorey) {
            const product = await productModel.findOne({ categorey });
            if (product) {
                productByCategorey.push(product);
            }
        }


        res.json({
            message: "Categorey Product",
            data: productByCategorey,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
};

const getCategoreyWiseProduct = async (req, res) => {
    try {
        const { categorey } = req.body || req.query;
        const products = await productModel.find({ categorey });

        res.json({
            data: products,
            message: "Products fetched successfully",
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({
            data: product,
            message: "Ok",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        console.log("Query:", query);
        const regex = new RegExp(query, 'i');
        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { categorey: regex }
            ]
        });
        res.json({
            data: product,
            message: "Search product list",
            error: false,
            success: true
        });
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = { searchProduct };


const filterProduct = async (req, res) => {
    try {
      const categoryList = req?.body?.categorey || [];
      console.log("Received category list:", categoryList); 
      console.log("Executing query:", {
        categorey: { "$in": categoryList }
      });
  
      const products = await productModel.find({
        categorey: {
          "$in": categoryList
        }
      });
      console.log("Filtered products:", products);
  
    //   if (products.length === 0) {
    //     console.log("No products found for the given categories.");
    //   }
  
      res.json({
        data: products,
        message: "product",
        success: true,
        error: false
      });
    } catch (error) {
      console.log("Error occurred:", error.message || error); // Log error
      res.json({
        message: error.message || error,
        error: true,
        success: false
      });
    }
  };
  
  
  
  
module.exports = {
    UploadProduct,
    getAllProducts,
    updateProduct,
    getCategoreyProduct,
    getCategoreyWiseProduct,
    getProductDetails,
    searchProduct,
    filterProduct
}
