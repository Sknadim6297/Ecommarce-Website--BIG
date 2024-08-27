const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const UserModel = require('../../models/UserModel');

const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;
        console.log(cartItems);
        
        const user = await UserModel.findOne({ _id: req.userId });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PsJAN05ohgckvyAEgLcb8e6',
                },
            ],
            customer_email: user.email,
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.productName,
                        images: item.productId.productImage,
                        metadata: {
                            productId: item.productId._id,
                        },
                    },
                    unit_amount: item.productId.sellingPrice * 100, // Convert to the smallest currency unit
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                    maximum: 10,
                },
                quantity: item.quantity,
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.status(200).json({ id: session.id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = paymentController;
