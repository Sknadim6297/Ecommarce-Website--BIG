const userModel = require("../../models/UserModel");

const UserLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }

}
module.exports = UserLogout;