const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { errorBuilder } = require("../../utils/errorBuilder");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ where: { email } });
    // Throw error if email already exists
    if(existingUser) {
      const error = new Error(ResponseConstants.User.Error.ExistingUser);
      error.statusCode = HttpStatusCodeConstants.UnProcessable;
      error.isCustom = true;
      throw error;
    }

    const user = await User.create({ name, email, password: hashedPassword });

    res.statusCode = HttpStatusCodeConstants.Created;
    res.responseBody = { message: ResponseConstants.User.SuccessMessage, userId: user.userId };
    next();
  } catch (error) {
    if(error.isCustom) {
      next(error);
    } else {
      console.error(error.message);
      let err = new Error(`Error registering user: ${error.message}`);
      next(err);
    }
  }
};

module.exports = { register };
