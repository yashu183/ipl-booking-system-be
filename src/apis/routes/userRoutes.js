const express = require('express');
const router = express.Router();
const { getUserById } = require("../handlers/user.handler");
const { verifyToken } = require("../../middlewares/authorizationHandler");

router.get('/:userId', verifyToken, getUserById);

module.exports = router;
