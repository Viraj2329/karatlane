const express = require("express");
const { check } = require("../middleware/check");
const { cartModel } = require("../model/cart.model");

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const data = await cartModel.find({ userID: userID });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

cartRouter.post("/add", async (req, res) => {
  try {
    const { Title, Description, Type, Weight, Price, DiscountPrice, Img, Brand, quantity } = req.body;

    // Create new cart item
    const cartItem = new cartModel({
      Title,
      Description,
      Type,
      Weight,
      Price,
      DiscountPrice,
      Img,
      Brand,
      quantity,
    });

    // Save to database
    await cartItem.save();

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem
    });
  } catch (err) {
    console.log(err);

  }
});

cartRouter.get("/getCart", async (req, res) => {
  try {
    const cartItems = await cartModel.find();
    res.status(200).json({
      success: true,
      cartItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart items",
      error: error.message
    });
  }
});



cartRouter.delete("/delete/:id", async (req, res) => {
  try {
      const { id } = req.params;

      const deletedCard = await cartModel.findOneAndDelete({ 
          _id: id,
          // owner: req.user._id 
      });

      if (!deletedCard) {
          return res.status(404).json({
              success: false,
              message: "Item not found in cart"
          });
      }

      return res.status(200).json({
          success: true,
          message: "Item removed from cart successfully",
          removedItem: deletedCard
      });

  } catch (err) {
      console.log(err);
      return res.status(500).json({
          success: false, 
          message: "Error removing item from cart",
          error: err.message
      });
  }
})

// cartRouter.delete("/delete/:id", async (req, res) => {
//   const productId = req.params.id;
//   //   console.log("productid", productId);

//   try {
//     let cart = await cartModel.findOneAndDelete({ productId });
//     // console.log("cartid", cart);
//     return res.status(200).send("deleted");
//   } catch (err) {
//     return res.status(400).send(err.message);
//   }
// });

module.exports = {
  cartRouter,
};
