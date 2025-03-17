const express = require('express');
const router = express.Router();
const { register, login } = require("../handlers/auth.handler");
const { registerUserValidationSchema } = require("../../validators/registerUserValidator");
const { loginUserValidationSchema } = require("../../validators/loginUserValidator");
const { validatioErrorHandler } = require("../../middlewares/validationErrorHandler");

router.post('/register', registerUserValidationSchema, validatioErrorHandler, register);
router.post('/login', loginUserValidationSchema, validatioErrorHandler, login);

module.exports = router;
