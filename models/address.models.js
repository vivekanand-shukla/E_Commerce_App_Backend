const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: 
    {
      type: String,
    },
  
  choosedAddressForOrder: {
    type: String,
    default: "",
  }
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
