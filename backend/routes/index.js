const express = require('express');
const UserSignUp = require('../controllers/User/UserSignUp');
const userDetails = require('../controllers/User/UserDetails');
const authToken = require('../middleware/authToken');
const UserLogout = require('../controllers/User/UserLogout');
const allUsers = require('../controllers/User/AllUsers');
const updateUser = require('../controllers/User/UpdateUser');
const uploadProduct = require('../controllers/Product/UploadProduct');
const getProduct = require('../controllers/Product/GetProduct');
const updateProduct = require('../controllers/Product/UpdateProduct');
const getCategoryProduct = require('../controllers/Product/GetCategoryProduct');
const getCategoryWiseProduct = require('../controllers/Product/GetProductCategoryWise');
const getProductDetails = require('../controllers/Product/GetProductDetails');
const deleteProduct = require('../controllers/Product/deleteProduct');
const AddToCartController = require('../controllers/User/AddToCartController');
const userSignInController = require('../controllers/User/UserSignIn');
const countAddToCartProduct = require('../controllers/User/CountAddToCartProduct');
const addTocartViewProduct = require('../controllers/User/AddtoCartViewProduct');
const updateAddToCartProduct = require('../controllers/User/UpdateAddToCartProduct');
const deleteAddToCartProduct = require('../controllers/User/deleteAddToCartProduct');
const filterProductController = require('../controllers/Product/filterProductController');
const searchProduct = require('../controllers/Product/searchProduct');
const paymentController = require('../controllers/Order/PaymentController');
const router= express.Router();

router.post('/signup',UserSignUp);
router.post('/login',userSignInController);
router.get('/user-details',authToken,userDetails)
router.post('/logout',authToken,UserLogout);
router.get('/all-users',authToken,allUsers);
router.post('/update-user',authToken,updateUser);  


router.post('/upload-product',authToken,uploadProduct);
router.delete('/product/:id', authToken,deleteProduct);
router.get('/all-products',getProduct);
router.post('/update-product',authToken,updateProduct); 
router.get('/get-category-product',getCategoryProduct);
router.post('/category-product',getCategoryWiseProduct );
router.post('/product-details',getProductDetails);
router.post("/filter-product",filterProductController)
router.get('/search',searchProduct);


router.post('/add-to-cart',authToken,AddToCartController);
router.get('/CartItemCount',authToken,countAddToCartProduct);
router.get('/get-cart-product',authToken,addTocartViewProduct);
router.post('/update-cart-product',authToken,updateAddToCartProduct);
router.post('/delete-cart-product',authToken,deleteAddToCartProduct);


router.post('/checkout',authToken,paymentController);

module.exports = router;