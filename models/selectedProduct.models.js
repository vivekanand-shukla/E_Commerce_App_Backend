const mongoose = require("mongoose")
const selectedProductSchema =new mongoose.Schema({


        selectedProductId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"products",
            require:true
        },

        isAddedToCart :Boolean,
        isAddedToWishList:Boolean,
        productQuantity:Number,
        isProductOrdered:Boolean


})
const selectedProduct = mongoose.model('selectedProduct' ,selectedProductSchema)
module.exports = selectedProduct;