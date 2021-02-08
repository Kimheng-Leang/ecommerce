const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app=express();
const router = require('./routes/admin');
const path = require('path')
const port=4000;
const cookieParser= require('cookie-parser');
const session = require('express-session');
const fileUpload = require("express-fileupload");
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(fileUpload({
    limits: { fileSize: 50* 1024 * 1024}
}));
app.use(express.static(path.join(__dirname,'Publish')));
app.use(cookieParser());
app.use(session({
    cookie:{
        path:'/',
        httpOnly:true,
        sameSite:true,
        maxAge:1000*60*60,
        secure:false
    },
    secret:"This is a secert key",
    name:'sid'
}))

app.use(router);
mongoose.connect('mongodb://localhost:27017/Product?readPreference=primary&appname=MongoDB%20Compass&ssl=false') // I use local mongoose
.then(result=>{
    console.log("DB is connected");
    app.listen(port)
})
.catch(err=>{
    console.log(err);
})
