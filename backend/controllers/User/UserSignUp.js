const userModel = require('../../models/UserModel');
const bcrypt = require('bcrypt');

const UserSignUp = async (req, res) => {
    try {
        const { email, password, name,profilePic} = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            role:'GENERAL',
            password: hashPassword,
            profilePic
        });

        await newUser.save();
        res.status(200).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = UserSignUp;