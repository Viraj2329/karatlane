const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./route/user.route")
const { productRouter } = require("./route/product.route")
const { adminRoute } = require("./route/admin.route")
const { cartRouter } = require("./route/cart.route")
const { OrderRouter } = require("./route/order.route")
const { check } = require("./middleware/check")



require("dotenv").config()
const app = express()
app.use(express.json())
const PORT = 5000;

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "DELETE"]
}))
app.get("/", (req, res) => {
  res.send("HomePage")
})
app.use("/cart", cartRouter)
app.use("/order", OrderRouter)

app.use("/admin", adminRoute)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use(check)




app.listen(PORT, async (req, res) => {
  try {
    await connection
    console.log("connected to db")
  } catch (err) {
    console.log(err)
    console.log("something went wrong")
  }
  console.log(`Running the port from ${PORT}`)
})