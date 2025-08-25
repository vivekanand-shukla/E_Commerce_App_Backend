const mongoose = require("mongoose")
const categorySchema = mongoose.model({
    productCategory:String,

})

const category = mongoose.model('category' , categorySchema)
module.exports = category;








