const express = require('express');
const router = express.Router();
const { register } = require("../handlers/auth.handler");
const { registerUserValidationSchema } = require("../../validators/registerUserValidator");
const { validatioErrorHandler } = require("../../middlewares/validationErrorHandler");

router.post('/register', registerUserValidationSchema, validatioErrorHandler, register);

module.exports = router;
