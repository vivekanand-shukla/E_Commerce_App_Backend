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
          required:true
    },
    productDiscription:{
        type:String,
        required:true
    },
    productSize:{
        type:String,
        required:true,
        enum:["S","M","XL","XXL"]
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
        
    }
})

const products =  mongoose.model('products' , productSchema);
 module.exports =products;

