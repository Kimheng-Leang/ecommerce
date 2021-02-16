const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')
// router.get('/',(req,res)=>{
//     res.render('Homepage')
// })
// router.get('/signin'(req,res)=>{
//     res.render('/signin')
// })
// router.get('/signup',(req,res)=>{
//     res.render('signup')
// })
// router.get('/Productpage',(req,res)=>{
//     res.render('Productpage')
// })
router.get('/',controller.Homepage);
router.get('/signin',controller.signin);
router.get('/signup',controller.signup);
router.get('/admin',controller.admin);
// router.get('/admin/addProduct',controller.AddProduct)

//register
router.post("/register",controller.register);
//login
router.post('/login',controller.login);
//router.post('/admin',controller.admin);
//for view detail product
router.post('/Productpage*',controller.Productpage);
//for add cart
router.post('/addCart',controller.addCart);
//router.post('/Purchase*',controller.purchase);
router.post('/Purchase/:productID',controller.purchase);

//admin can add product
router.post('/admin/addProduct',controller.addProduct);
//Get all products from database
router.get('/admin/getProducts',controller.getProducts);
//Get all users from database
router.get('/admin/getUsers',controller.getUsers);
//Delete one product
router.delete('/admin/:productID',controller.Delete)
//Get one product for update
router.get('/admin/:productID',controller.getOneProduct);
//Update product
router.patch('/admin/:productID',controller.editProduct);

//router.get('/Productpage/:productID',controller.Productpage);
//User post comment
router.post('/Productpage/postComment',controller.postComment);
//Get comments from DB
router.get('/Productpage/postComments',controller.getComments);

router.post('/admin/logout',controller.logout)

router.get('/getProducts',controller.getProducts);

router.get('/:productID',controller.getOneProduct);




//router.get('/Productpage',controller.postComment);
module.exports=router;