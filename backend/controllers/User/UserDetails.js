const userModel = require("../../models/UserModel");

const userDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        res.status(200).json({ message: 'User details fetched successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = userDetails;