const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema= new Schema({
    userName:{
        type:String,
        required:true
    },
    postComment:{
        type:String,
        required:true
    },
    commentAt:{
        type:String,
        required:true
    },
    commentTime:{
        type:String,
        required:true
    }
},{collection:"comments"});

module.exports=mongoose.model("Comment",commentSchema);
