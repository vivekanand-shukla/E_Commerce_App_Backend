const {connectDb}  = require("./connect/db.connect");
connectDb();
const address = require("./models/address.models")
const category = require("./models/category.models")
const products = require("./models/productModel.models")
const selectedProduct = require("./models/selectedProduct.models")
const PORT = process.env.PORT || 3000
const express = require("express")
const app = express();
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("done")
})




app.listen(PORT,()=>{
    console.log("server connected successfully on port  http://localhost:3000/")
})










