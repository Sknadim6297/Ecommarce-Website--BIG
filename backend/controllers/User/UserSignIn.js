const userModel=require('../../models/UserModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');

const UserLogin = async (req, res) => {
  try{
    const { email , password} = req.body;
    if(!email || !password){
        throw new Error("Please enter all fields")
    }

    const user = await userModel.findOne({email})

   if(!user){
        throw new Error("User not found")
   }

   const checkPassword = await bcrypt.compare(password,user.password)

   if(checkPassword){
    const tokenData = {
        _id : user._id,
        email : user.email,
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 8 });

    const tokenOption = {
        httpOnly : true,
        secure : true
    }

    res.cookie("token",token,tokenOption).status(200).json({
        message : "Login successfully",
        data : token,
        success : true,
        error : false
    })

   }else{
     throw new Error("Please check Password")
   }







}catch(err){
    res.json({
        message : err.message || err  ,
        error : true,
        success : false,
    })
}
}
  module.exports = UserLogin;
