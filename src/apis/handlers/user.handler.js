const { User } = require('../../models');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { HttpStatusCodeConstants } = require("../../constants/HttpStatusCodeConstants");

const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ where: { userId, isDeleted: false } });
    
        if(!user) {
            const error = new Error(ResponseConstants.User.Error.NotFound);
            error.statusCode = HttpStatusCodeConstants.NotFound;
            throw error;
        }
    
        res.statusCode = HttpStatusCodeConstants.Ok;
        res.responseBody = { userId: user.userId, name: user.name, email: user.email, role: user.role };
        next();
    } catch(error) {
        console.error(`Error while getting an user : ${error.message}`);
        next(error);
    }
}

module.exports = { getUserById };