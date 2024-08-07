const express = require('express');
const UserSignUp = require('../controllers/User/UserSignUp');
const UserLogin = require('../controllers/User/UserSignIn');
const userDetails = require('../controllers/User/UserDetails');
const authToken = require('../middleware/authToken');
const UserLogout = require('../controllers/User/UserLogout');
const allUsers = require('../controllers/User/AllUsers');
const updateUser = require('../controllers/User/UpdateUser');

const router= express.Router();

router.post('/signup',UserSignUp);
router.post('/login',UserLogin);
router.get('/user-details',authToken,userDetails)
router.post('/logout',authToken,UserLogout);
router.get('/all-users',authToken,allUsers);
router.post('/update-user',authToken,updateUser);  


module.exports = router;