const express = require('express');
const router = express.Router();
const { register, login, getAll } = require("../handlers/auth.handler");
const { registerUserValidationSchema } = require("../../validators/registerUserValidator");
const { loginUserValidationSchema } = require("../../validators/loginUserValidator");
const { validatioErrorHandler } = require("../../middlewares/validationErrorHandler");
const { verifyToken, isAdmin, checkUserIdMatch } = require("../../middlewares/authorizationHandler");

router.post('/register', registerUserValidationSchema, validatioErrorHandler, register);
router.post('/login', loginUserValidationSchema, validatioErrorHandler, login);
router.get('/', verifyToken, isAdmin, getAll);

module.exports = router;
