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

async function addCategory(newCategory){
    try {
         const newCategorydata = new category(newCategory)
         const ReturnData =   await newCategorydata.save()
         return ReturnData;
    } catch (error) {
         console.log("error is : " , error)
    }
   
}

app.post("/category", async (req,res)=>{
         try {
         const addNewCategory =   await  addCategory(req.body)
         if(addNewCategory){
            res.send("category added successfully")
         }
            
         } catch (error) {
             res.status(500).json({error: "post the category failed "})
         }
})




app.listen(PORT,()=>{
    console.log("server connected successfully on port  http://localhost:3000/")
})










