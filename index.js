const {connectDb}  = require("./connect/db.connect");
connectDb();
const address = require("./models/address.models")
const category = require("./models/category.models")
const product = require("./models/productModel.models")
const selectedProduct = require("./models/selectedProduct.models")
const PORT = process.env.PORT || 3000
const express = require("express")
const app = express();
app.use(express.json())
//cors
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//routes
app.get('/', (req,res)=>{
    res.send("server is running on routes after /")
})
//add Category Section
async function addCategory(newCategory){
    try {
         const newCategorydata = new category(newCategory)
         const ReturnData =   await newCategorydata.save()
         return ReturnData;
    } catch (error) {
         console.log("error is : " , error)
    }
   
}

app.post("/api/category", async (req,res)=>{
         try {
         const addNewCategory =   await  addCategory(req.body)
         if(addNewCategory){
            res.send({ message:"category added successfully" ,createdCategory :addNewCategory})
         }
            
         } catch (error) {
             res.status(500).json({error: "post the category failed internal server error "})
         }
})
// add product section
async function addProduct(productParam){
     try {
    

            const newProduct = new product(productParam)
            const saveProduct =await  newProduct.save()
            return saveProduct
        }
        
      catch (error) {
         console.log("error is : ", error)
     }
}
app.post('/api/product' ,async (req,res)=>{
    try {
         const addNewProduct  = await addProduct(req.body)
       if(addNewProduct)  {
        res.send({message:"product added successfully " , addedProduct:addNewProduct })
       }
    } catch (error) {
         res.status(500).json({error: "post the product failed internal server error"})
    }
     
} )


// get all products 
async function getAllProduct(){
     try {
            const allProduct =await  product.find().populate("category")
            return allProduct
        }
        
      catch (error) {
         console.log("error is : ", error)
     }
}
app.get('/api/products' ,async (req,res)=>{
    try {
         const getAllProducts  = await getAllProduct()
       if(getAllProducts)  {
        res.send(getAllProducts)
       }
    } catch (error) {
         res.status(500).json({error: "post the product failed internal server error"})
    }
     
} )

// get single product
async function getSingleProduct(id) {
    try {
        const singleProduct = await product.findById(id)
        return singleProduct
    } catch (error) {
        console.log("error is : ", error)
    }
}

app.get('/api/product/:id', async (req, res) => {
    try {
        const singleProduct = await getSingleProduct(req.params.id)
        if (singleProduct) {
            res.send(singleProduct)
        } else {
            res.status(404).json({ error: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "get single product failed internal server error" })
    }
})

// get single category
async function getSingleCategory(category) {
    try {
        const singleCategory = await product.find({category:category}).populate("category")
        return singleCategory
    } catch (error) {
        console.log("error is : ", error)
    }
}

app.get('/api/category/:id', async (req, res) => {
    try {
        const singleCategory = await getSingleCategory(req.params.id)
        if (singleCategory) {
            res.send(singleCategory)
        } else {
            res.status(404).json({ error: "Category not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "get single category failed internal server error" })
    }
})


// selected products 
//post
async function postSelectedProduct(productParam){
       try {
    
           if(productParam.selectedProductId  &&  productParam.isAddedToCart && productParam.isAddedToWishList  && productParam.productQuantity && productParam.isProductOrdered){
                const newProduct = new selectedProduct(productParam)
            const saveProduct =await  newProduct.save()
            return saveProduct
           }
          
        }
        
      catch (error) {
         console.log("error is : ", error)
     }
}
app.post('/api/products/select' ,async (req,res)=>{
    try {
         const addSelectedProduct  = await postSelectedProduct(req.body)
       if(addSelectedProduct)  {
        res.send(addSelectedProduct)
       }
    } catch (error) {
         res.status(500).json({error: "post the selected product failed internal server error"})
    }
     
} )
// get selected Poduct
async function getAllSelectedProduct(){
     try {
            const selectedProductIs = await  selectedProduct.find()
            return selectedProductIs
        }
        
      catch (error) {
         console.log("error is : ", error)
     }
}
app.get('/api/products/selected' ,async (req,res)=>{
    try {
         const getAllSelectedProducts  = await getAllSelectedProduct()
       if(getAllSelectedProducts)  {
        res.send(getAllSelectedProducts)
       }
    } catch (error) {
         res.status(500).json({error: "get all selected product failed internal server error"})
    }
     
} )




app.listen(PORT,()=>{
    console.log("server connected successfully on port  http://localhost:3000/")
})










