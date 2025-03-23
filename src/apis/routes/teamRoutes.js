const express = require('express');
const router = express.Router();
const { getAllTeams } = require("../handlers/team.handler");
const { validatioErrorHandler } = require("../../middlewares/validationErrorHandler");
const { verifyToken, isAdmin } = require("../../middlewares/authorizationHandler");

router.get('/', verifyToken, isAdmin, validatioErrorHandler, getAllTeams);

module.exports = router;