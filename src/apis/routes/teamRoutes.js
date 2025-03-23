const express = require('express');
const router = express.Router();
const { getAllTeams } = require("../handlers/team.handler");
const { verifyToken, isAdmin } = require("../../middlewares/authorizationHandler");

router.get('/', verifyToken, isAdmin, getAllTeams);

module.exports = router;