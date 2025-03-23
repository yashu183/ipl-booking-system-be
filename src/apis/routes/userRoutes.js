const express = require('express');
const router = express.Router();
const { getUserById } = require("../handlers/user.handler");
const { verifyToken, checkUserIdMatch } = require("../../middlewares/authorizationHandler");

router.get('/:userId', verifyToken, checkUserIdMatch, getUserById);

module.exports = router;
