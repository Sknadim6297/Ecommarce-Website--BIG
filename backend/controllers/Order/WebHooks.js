const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const webhooks=async(req,res)=>{
}


module.exports={
    webhooks
}