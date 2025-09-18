const {connectDb}  = require("./connect/db.connect");
connectDb();
const Address  = require("./models/address.models")
const category = require("./models/category.models")
const product = require("./models/productModel.models")



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



// ====routes=====
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





// ===product routes ===
async function addProduct(productParam) {
  try {
   
    const {
      productImage,
      productName,
      productPrice,
      productRating,
      productDiscription,
      offOnProduct,
      longDiscription,
      category,
      diliveryCharges
    } = productParam;

    const newProduct = new product({
      productImage,
      productName,
      productPrice,
      productRating,
      productDiscription,
      offOnProduct,
      longDiscription,
      category,
      diliveryCharges
      
    });

    const saveProduct = await newProduct.save();
    return saveProduct;
  } catch (error) {
    console.log("error is : ", error);
  }
}





app.post('/api/product', async (req, res) => {
  try {
    console.log("Incoming Body: ", req.body); // Debug
    const addNewProduct = await addProduct(req.body);
    if (addNewProduct) {
      res.send({ message: "Product added successfully", addedProduct: addNewProduct });
    }
  } catch (error) {
    res.status(500).json({ error: "Post the product failed: internal server error" });
  }
});




// bulk add products route 
app.post('/api/products/bulk', async (req, res) => {
  try {
    const productsArray = req.body; 

    if (!Array.isArray(productsArray) || productsArray.length === 0) {
      return res.status(400).json({ error: "Products array is required" });
    }

  
    const filteredProducts = productsArray.map(p => ({
      productImage: p.productImage,
      productName: p.productName,
      productPrice: p.productPrice,
      productRating: p.productRating,
      productDiscription: p.productDiscription,
      offOnProduct: p.offOnProduct,
      longDiscription: p.longDiscription,
      category: p.category,
      diliveryCharges: p.diliveryCharges
      
    }));

    //  insertMany will add all at once
    const savedProducts = await product.insertMany(filteredProducts);

    res.status(201).json({
      message: "Products added successfully",
      addedProducts: savedProducts
    });

  } catch (error) {
    console.error("Bulk add error:", error);
    res.status(500).json({ error: "Bulk insert failed: internal server error" });
  }
});
//


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


//update products 

async function updateProduct(dataId,dataToUpdate){
    try {
        const updatedData = await product.findByIdAndUpdate(dataId ,dataToUpdate , {new:true})
        return updatedData
    } catch (error) {
        console.log("error in updating data " ,error)
    }
}

app.post('/api/products/update/:id' , async(req,res)=>{
    try {
          const updatedData = await  updateProduct(req.params.id , req.body)
         if(updatedData){
       res.status(200).json({message :"data updated successfully." ,updatedData :updatedData })
    }else{
      res.status(404).json({error :"data not found"})
    }
    } catch (error) {
         res.status(500).json({error:  "Failed to update data."})
    }
})

// ====Address section =====

app.post("/api/address", async (req, res) => {
  try {
    if(req.body.address){
      const newAdress = new Address(req.body)

    
    const data = await newAdress.save()
    res.json(data);}
    else{
      res.status(400).json({message:"enter correct field"})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all
app.get("/api/address", async (req, res) => {
  try {
    const data = await Address.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
app.get("/api/address/:id", async (req, res) => {
  try {
    const data = await Address.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
app.post("/address/:id", async (req, res) => {
  try {
    const data = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
app.delete("/api/address/:id", async (req, res) => {
  try {
    const data = await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/api/choosedAdress", async (req, res) => {
  try {
    const result = await Address.updateMany({}, { choosedAddressForOrder: req.body.newChoosedAddress });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ====Address section end =====









app.listen(PORT,()=>{
    console.log("server connected successfully on port  http://localhost:3000/")
})










