const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema({
      
    address:[{
         type:String,
          
    }],

    choosedAddressForOrder: {
      type:String,
      
    }
})
const address = mongoose.model('address' ,addressSchema )
module.exports = address;