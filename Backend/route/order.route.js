const express = require("express");
const {OrderModel} = require("../model/order.model")

const OrderRouter = express.Router();

// Get orders for a user
OrderRouter.get("/",async(req,res)=>{
    const userId = req.body.userId;
    try {
        const orders = await OrderModel.find({userId})
            .populate("userId", ["name", "email", "number"])
            .populate("products.productId", ["Title", "Price", "Img"]);
            
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Create new order
OrderRouter.post("/add",async(req,res)=>{
    try {
        const {
            first_name, 
            last_name, 
            city, 
            address, 
            pincode, 
            country,
        } = req.body;
        
        const orderData = {
            first_name,
            last_name, 
            city,
            address,
            pincode,
            country,
            order: "placed",
        }

        const newOrder = await OrderModel.create(orderData);
        
        // const populatedOrder = await OrderModel.findById(newOrder._id)
        //     .populate("userId", ["name", "email", "number"])
        //     .populate("products.productId", ["Title", "Price", "Img"]);

        res.status(201).json({
            success : true,
            message: "Order created successfully", 
            order: newOrder
        });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

OrderRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
  
        const deletedCard = await OrderModel.findOneAndDelete({ 
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

// Get all orders
OrderRouter.get("/getOrder", async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json({
            success: true,
            orders: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});



module.exports = {OrderRouter}