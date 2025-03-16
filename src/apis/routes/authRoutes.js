const express = require('express');
const router = express.Router();
const { register } = require("../handlers/auth.handler");

router.post('/register', register);

module.exports = router;
