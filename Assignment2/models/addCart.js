const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Color:{
        type:String,
        required:true
    },
    Size:{
        type:String,
        required:true
    },
    Quantity:{
        type:String,
        required:true
    },
    Total:{
        type:String,
        required:true
    }
},{collection:'addCarts'})

module.exports=mongoose.model('Addcart',cartSchema);