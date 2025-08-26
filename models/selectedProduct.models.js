const mongoose = require("mongoose")
const selectedProductSchema =new mongoose.Schema({


        selectedProduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"products"
        },

        isAddedToCart :Boolean,
        isAddedToWishList:Boolean,
        productQuantity:Number,
        isProductOrdered:Boolean


})
const selectedProduct = mongoose.model('selectedProduct' ,selectedProductSchema)
module.exports = selectedProduct;