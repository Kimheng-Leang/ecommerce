const user = require('../models/users');
const bcrypt= require('bcryptjs');
const admin = require('../models/admin');
const product = require('../models/postProduct');
const comment= require('../models/userComment');
const { patch } = require('../routes/admin');
exports.signin=(req,res)=>{
    if(!req.session.userId){
        res.render('signin',{err:false});
    }
    res.redirect('/')
}
exports.signup=(req,res)=>{
    if(req.session.userId){
        res.redirect('/')
    }
    else{
        res.render('signup',{
            username:"",
            email:"",
            password:"",
            confirm_password:"",
            err:false,
            errCheckBox:false});
    }
}
exports.Homepage=(req,res)=>{
    res.render('Homepage')
    
}
exports.Productpage=(req,res)=>{
    res.render('Productpage')
}
exports.register= (req,res)=>{
    //if it's not work go to file ejs, create form oy them
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password= req.body.confirm_password;
    const checkBox=req.body.checkBox;
    console.log(checkBox);
    const salt = bcrypt.genSaltSync(10);
    const date = new Date();
    if(checkBox&&username!=null&&password!=null&&confirm_password!=null&&email!=null&&password==confirm_password){
        //console.log(checkBox);
        user.find({email:email}).then(result=>{
            console.log(result);
            if(result.length!=0){
                res.render('signup',{
                    username:username,
                    email:email,
                    password:password,
                    confirm_password:confirm_password,
                    err:true,
                    errCheckBox:false,
                    errEmail:"Email address is already exist!"})
            }
            else{
                const User = new user({
                    username:username,
                    email:email,
                    password:bcrypt.hashSync(password,salt),
                    registerAt:date.toISOString()
                }).save().then(result=>{
                    console.log(result);
                    res.redirect('/signin')
                }).catch(err=>{
                    res.render('signup');
                    console.log(err);
                    })
                    }
        }).catch(err=>{
            console.log(err);
        })
    }
    else {
        if(!checkBox){
            res.render('signup',{
                username:username,
                email:email,
                password:password,
                confirm_password:confirm_password,
                err:false,
                errCheckBox:true,
                message:"Checkbox are required!"
            })
        }
    }
    // const User = new user({
    //     username:username,
    //     email:email,
    //     password:bcrypt.hashSync(password,salt),
    //     registerAt:date.toISOString()
    // }).save().then(result=>{
    //     console.log(result);
    //     res.redirect('/signin')
    // }).catch(err=>{
    //     res.render('signup');
    //     console.log(err);
    // })
}
exports.login=(req,res)=>{
    const email= req.body.email;
    const password= req.body.password;
    user.find({email:email})
    .then(result=>{
        if(result.length!=0){
            //console.log(result.password);
            bcrypt.compare(password,result[0].password,(err,match)=>{
                if(match){//with password correct
                    res.cookie("username",result[0].username,{expire:3600*1000});
                    res.cookie("logged-time",new Date().toISOString(),{expire:3600*1000});
                    //store user data to session
                    req.session.userId = result[0]._id;
                    req.session.userName = result[0].username;// i want to get user name for comment 
                    //console.log(req.session.userId);
                    res.redirect('/');
                }
                else {
                    res.render("signin",{err:true,message:"Password incorrect"})
                }
            })
        }
        else{
            res.render("signin",{err:true,message:"Password incorrect",emailMessage:"Email incorrect"})
        }
    }).catch(err=>{
        console.log(err);
    })
    // admin.find({adminEmail:email}).then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })
}
exports.purchase=(req,res)=>{
    const purchase = req.body.purchase;
    console.log(purchase);
    if(purchase!==null){
        console.log(req.session.userId);
        if(!req.session.userId){
            res.redirect('signin')
        }
        else{
            res.redirect('Productpage')
        }
    }
}
exports.admin=(req,res)=>{
    res.render('AdminPanel')
    
}
exports.logout=(req,res)=>{
    console.log("connect");
    req.session.destroy();
    res.redirect('/signin');
}
exports.addProduct=(req,res)=>{
    const productName=req.body.productName;
    const Quantity = req.body.Quantity;
    const Detail = req.body.Detail;
    const date = new Date();
    const Category = req.body.Category;
    const path = require('path');
    //const imageName = req.files.image;
    let image;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let folder=path.join(__dirname,"../Publish")
    console.log(__dirname);
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    image = req.files.image;
    uploadPath = folder +"/assets/images/" + image.name;
    //console.log(uploadPath);
    //Use the mv() method to place the file somewhere on your server
    image.mv(uploadPath, function(err) {
    if (err)
        return res.status(500).send(err);
    
        console.log("File uploaded!");
    });
    const Product = new product({
        Path:"../assets/images/"+image.name,
        productName:productName,
        Quantity:Quantity,
        Detail:Detail,
        InstockAt: date.toDateString(),
        Category :Category
    }).save().then(result=>{
        console.log(result);
        res.redirect('/admin')
    }).catch(err=>{
        console.log(err);
    })
}

exports.getProducts=(req,res)=>{
    product.find().then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
    })
}
exports.getUsers=(req,res)=>{
    user.find().then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.Delete=(req,res)=>{
    const productID=req.params.productID;
    product.findByIdAndDelete(productID).then(result=>{
        console.log(result);
        res.json(result)
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.getOneProduct=(req,res)=>{
    const productID=req.params.productID;
    product.findById(productID).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
    })
}
exports.editProduct=(req,res)=>{
    const productID=req.params.productID;
    const updateProductName=req.body.productName;
    const updateQuantity=req.body.Quantity;
    const updateDetail=req.body.Detail;
    const updateCategory=req.body.Category;
    console.log(productID);
    product.findById(productID).then(result=>{
        result.productName=updateProductName;
        result.Quantity=updateQuantity;
        result.Detail=updateDetail;
        result.Category=updateCategory;
        res.json(result)
        return result.save();
    }).catch(err=>{
        console.log(err);
    })
}
exports.postComment=(req,res)=>{
    const postComment=req.body.postComment;
    const date= new Date();
    //const userName = req.session.userName;
    // console.log(userName);
    console.log(req.session.userId);
    if(!req.session.userId){
        res.json({redirectUrl:"/signin"}) // We do with axios.post, so we need to res.json to axios
    }
    else{
        const Comment = new comment({
            userName:req.session.userName,
            postComment:postComment,
            commentAt:date.toDateString(),
            commentTime:date.toLocaleTimeString()
        }).save().then(result=>{
            //console.log(result);
            res.json(result)
        }).catch(err=>{
            console.log(err);
        })
    }
}

exports.getComments=(req,res)=>{
    comment.find().then(results=>{
        res.json(results);
    }).catch(err=>{
        console.log(err);
    })
}
//for create admin, i have created admin by post man
// exports.admin=(req,res)=>{
//     const adminName=req.body.adminName;
//     const adminEmail=req.body.adminEmail;
//     const adminPassword=req.body.adminPassword;
//     const salt = bcrypt.genSaltSync(10);

//     const Admin = new admin({
//         adminName:adminName,
//         adminEmail:adminEmail,
//         adminPassword:bcrypt.hashSync(adminPassword,salt)
//     }).save().then(result=>{
//         console.log(result);
//     }).catch(err=>{
//         console.log(err);
//     })
// }