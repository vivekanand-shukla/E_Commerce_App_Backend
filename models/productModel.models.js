const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    productImage:{
      type:  String,
      required:true
    } ,
    productName :{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },

    productRating:{

          type:Number,
          required:true,
          max:5,
          min:0
    },
    productDiscription:{
        type:String,
        required:true
    },
 
    offOnProduct : {
        type:Number,
         max:100,

    },
    longDiscription:[{
        type:String,
        required:true
    }],
    category:{
        
            type: mongoose.Schema.Types.ObjectId,
            ref:"category",
            required:true
        
    },
    diliveryCharges:{
        type:Number,
        
    },
    
        isAddedToCart :{
        type:    Boolean,
        default: false

        },
        isAddedToWishList:{
         type:   Boolean,
         default :false
           },
        productQuantity:{
            type: Number,
                  default: 1},

        isProductOrdered:{
         type:   Boolean,
         default :false
           }

})

const products =  mongoose.model('products' , productSchema);
 module.exports =products;

