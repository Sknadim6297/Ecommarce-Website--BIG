const userModel = require('../models/UserModel');


const uploadPermission =async(userId) => {
    const User=await userModel.findById(userId);

    if(User.role === 'ADMIN'){
        return true;
    }
    return false;
    
}

module.exports = uploadPermission;