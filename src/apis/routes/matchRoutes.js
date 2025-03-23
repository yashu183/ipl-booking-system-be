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
router.get('/:matchId(\\d+)', verifyToken, getMatchById);
router.put('/:matchId(\\d+)', verifyToken, isAdmin, matchValidationSchema, validatioErrorHandler, updateMatch);
router.delete('/:matchId(\\d+)', verifyToken, isAdmin, deleteMatch);
router.get('/filter', verifyToken, filterMatches);

module.exports = router;