const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    productCategory:String,

})

const category = mongoose.model('category' , categorySchema)
module.exports = category;








