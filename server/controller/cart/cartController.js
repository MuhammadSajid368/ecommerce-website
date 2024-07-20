const cartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModel");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = await userModel.findById(req.user._id);


    const isProductAvailable = await cartModel.findOne({ productId, userId: currentUser });

    if (isProductAvailable) {
      return res.json({
        message: "Already added to the cart",
        error: true,
        success: false
      });
    }

    const newAddToCart = new cartModel({
      productId: productId,
      quantity: 1,
      userId: currentUser
    });
    const saveProduct = await newAddToCart.save();

    return res.json({
      saveProduct,
      message: "Product Added in Cart",
      success: true,
      error: false
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false
    });
  }
};

const countAddToCartProduct = async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.user._id);
    console.log("User ID:", currentUser);

    if (!currentUser) {
      return res.status(400).json({
        message: "User ID is missing",
        error: true,
        success: false
      });
    }
    console.log("Query: { userId: currentUser._id }");

    const count = await cartModel.countDocuments({
      userId: currentUser._id // Correctly use the userId field here
    });
    console.log("Cart Count:", count);

    res.json({
      data: {
        count: count
      },
      message: "Ok",
      error: false,
      success: true
    });
  } catch (error) {
    console.error("Error in countAddToCartProduct:", error);
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};



const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.user._id);

    const allProduct = await cartModel.find({
      userId: currentUser
    }).populate("productId");
    res.json({
      data: allProduct,
      success: true,
      error: false
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = await userModel.findById(req.user._id);

    const addToCartProductId = req.body._id

    const deleteProduct = await cartModel.deleteOne({ _id: addToCartProductId })

    res.json({
      message: "Product deleted successfully",
      error: false,
      success: true,
      data: deleteProduct
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.user._id);

    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await cartModel.updateOne(
      { _id: addToCartProductId },
      { ...(qty && { quantity: qty }) }
    );

    res.json({
      message: "product updated",
      data: updateProduct,
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


module.exports = {
  addToCart,
  countAddToCartProduct,
  addToCartViewProduct,
  deleteAddToCartProduct,
  updateAddToCartProduct
}