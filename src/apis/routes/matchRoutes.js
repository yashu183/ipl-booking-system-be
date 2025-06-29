const express = require('express');
const router = express.Router();
const { 
  createMatch, 
  getAllMatches, 
  getMatchById, 
  updateMatch, 
  deleteMatch,
  getUpcomingMatches,
  filterMatches
} = require("../handlers/match.handler");
const { matchValidationSchema } = require("../../validators/matchValidator");
const { validatioErrorHandler } = require("../../middlewares/validationErrorHandler");
const { verifyToken, isAdmin } = require("../../middlewares/authorizationHandler");

router.post('/', verifyToken, isAdmin, matchValidationSchema, validatioErrorHandler, createMatch);
router.get('/', verifyToken, getAllMatches);
router.get('/upcoming', verifyToken, getUpcomingMatches);
router.get('/filter', verifyToken, filterMatches);
router.get('/:matchId([a-fA-F0-9]{24})', verifyToken, getMatchById);
router.put('/:matchId([a-fA-F0-9]{24})', verifyToken, isAdmin, matchValidationSchema, validatioErrorHandler, updateMatch);
router.delete('/:matchId([a-fA-F0-9]{24})', verifyToken, isAdmin, deleteMatch);

module.exports = router;