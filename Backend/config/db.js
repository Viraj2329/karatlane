const mongoose = require("mongoose")
require("dotenv").config()
const connection =  mongoose.connect('mongodb+srv://Sumit:200417@cluster-myntra.tn6whln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-myntra')

module.exports = {
    connection
}