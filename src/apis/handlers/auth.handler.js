const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role, createdUserId });

    res.statusCode = HttpStatusCodeConstants.Created;
    res.responseBody = { message: 'User registered successfully', userId: user.userId };
    next();
  } catch (error) {
    console.error(error.message);
    let err = new Error(`Error registering user: ${error.message}`);
    next(err);
  }
};

module.exports = { register };
