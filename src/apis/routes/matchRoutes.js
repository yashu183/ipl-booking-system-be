const express = require('express');
const router = express.Router();
const { 
  createMatch, 
  getAllMatches, 
  getMatchById, 
  updateMatch, 
  deleteMatch,
  getUpcomingMatches
} = require("../handlers/match.handler");
const { matchValidationSchema } = require("../../validators/matchValidator");
const { validatioErrorHandler } = require("../../middlewares/validationErrorHandler");
const { verifyToken, isAdmin } = require("../../middlewares/authorizationHandler");

// Create a new match (admin only)
router.post('/', matchValidationSchema, validatioErrorHandler, verifyToken, isAdmin, createMatch);

// Get all matches (public)
router.get('/', verifyToken, getAllMatches);

// Get upcoming matches
router.get('/upcoming', verifyToken, getUpcomingMatches);

// Get match by ID 
router.get('/id/:matchId', verifyToken, isAdmin, getMatchById);

// Update match (admin only)
router.put('/:matchId', matchValidationSchema, validatioErrorHandler, verifyToken, isAdmin, updateMatch);

// Delete match (admin only)
router.delete('/:matchId', verifyToken, isAdmin, deleteMatch);

module.exports = router;