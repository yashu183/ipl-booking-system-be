const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { Match } = require('../../models');
const { Op } = require('sequelize');

// Create a new match
const createMatch = async (req, res, next) => {
  try {
    const matchData = req.body;
    const newMatch = await Match.create(matchData);
    
    res.statusCode = HttpStatusCodeConstants.Created;
    res.responseBody = {
      message: ResponseConstants.Matches.CreateSuccessMessage,
      data: newMatch
    };
    
    console.log(`Match created successfully with ID: ${newMatch.matchId}`);
    next();
  } catch (error) {
    console.error('Error creating match:', error.message);
    next(error);
  }
};

// Get all matches with optional filtering
const getAllMatches = async (req, res, next) => {
  try {
    const filters = req.body.filters || {};
    
    // Default: don't show deleted matches unless specifically requested
    if (filters.isDeleted === undefined) {
      filters.isDeleted = false;
    }
    
    const matches = await Match.findAll({ 
      where: filters,
      order: [['scheduledDate', 'ASC']]
    });
    
    res.responseBody = {
      message: ResponseConstants.Matches.FetchAllSuccessMessage,
      data: matches
    };
    
    console.log(`Retrieved ${matches.length} matches`);
    next();
  } catch (error) {
    console.error('Error retrieving matches:', error.message);
    next(error);
  }
};

// Get a single match by ID
const getMatchById = async (req, res, next) => {
  try {
    const { matchId } = req.params;
    
    const match = await Match.findByPk(matchId);
    if (!match || match.isDeleted) {
      const error = new Error(ResponseConstants.Matches.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    } else {
      res.responseBody = {
        message: ResponseConstants.Matches.FetchSuccessMessage,
        data: match
      };
    }
    
    console.log(`Retrieved match with ID: ${matchId}`);
    next();
  } catch (error) {
    console.error('Error retrieving match:', error.message);
    next(error);
  }
};

// Update an existing match
const updateMatch = async (req, res, next) => {
  try {
    const {matchId} = req.params;
    const { ...updateData } = req.body;
    
    // Mark as updated
    updateData.isUpdated = true;
    updateData.updatedAt = new Date();
    
    const [updatedRowsCount, updatedMatches] = await Match.update(
      updateData,
      {
        where: { matchId },
        returning: true
      }
    );
    
    if (updatedRowsCount === 0) {
      const error = new Error(ResponseConstants.Matches.UpdateFailed);
      throw error;
    } else {
      res.responseBody = {
        message: ResponseConstants.Matches.UpdateSuccessMessage,
        data: updatedMatches[0]
      };
    }
    
    console.log(`Updated match with ID: ${matchId}`);
    next();
  } catch (error) {
    console.error('Error updating match:', error.message);
    next(error);
  }
};

// Soft delete a match (set isDeleted to true)
const deleteMatch = async (req, res, next) => {
  try {
    const { matchId } = req.params;
    const { updatedUserId } = req.body;
    
    const match = await Match.findByPk(matchId);
    
    if (!match || match.isDeleted) {
      const error = new Error(ResponseConstants.Matches.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    }
    
    // Perform soft delete
    await Match.update(
      {
        isDeleted: true,
        updatedAt: new Date(),
        updatedUserId
      },
      {
        where: { matchId }
      }
    );
    
    res.responseBody = {
      message: ResponseConstants.Matches.DeleteSuccessMessage,
      data: { matchId }
    };
    
    console.log(`Soft deleted match with ID: ${matchId}`);
    next();
  } catch (error) {
    console.error('Error deleting match:', error.message);
    next(error);
  }
};

// Get upcoming matches
const getUpcomingMatches = async (req, res, next) => {
  try {
    const { limit } = req.body;
    const currentDate = new Date().toISOString();
    const matches = await Match.findAll({
      where: {
        scheduledDate: { [Op.gt]: currentDate },
        isDeleted: false
      },
      order: [['scheduledDate', 'ASC']],
      limit: limit || 10
    });
    
    res.responseBody = {
      message: ResponseConstants.Matches.FetchUpcomingSuccessMessage,
      data: matches
    };
    
    console.log(`Retrieved ${matches.length} upcoming matches`);
    next();
  } catch (error) {
    console.error('Error retrieving upcoming matches:', error.message);
    next(error);
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  getUpcomingMatches
};