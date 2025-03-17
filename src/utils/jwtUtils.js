const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateJwtToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = { generateJwtToken };