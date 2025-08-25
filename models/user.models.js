const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
      
    products:{
        isAddedToCart :Boolean,
        isAddedToWishList:Boolean,
        productQuantity:{
            type:Number,
         }

    },

    address:[{
         type:String,
          
    }],

    choosedAddress: {
      type:String,
      enum:[address]
    }
})
const user = mongoose.model('user' ,userSchema )
module.exports = user;