const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Path:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    Quantity:{
        type:String,
        required:true
    },
    Detail:{
        type:String,
        required:true
    },
    InstockAt:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    }
},{collection:"products"})

module.exports=mongoose.model("Product",productSchema);