const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { Match, Team } = require('../../models');
const { Op } = require('sequelize');

// Create a new match
const createMatch = async (req, res, next) => {
  try {
    const matchData = req.body;

    // check if match exists with the given data
    const existingMatch = await Match.findOne({ where: { homeTeamId: matchData.homeTeamId, awayTeamId: matchData.awayTeamId, scheduledDate: matchData.scheduledDate } });
    if(existingMatch) {
      const error = new Error(ResponseConstants.Matches.AlreadyExists);
      error.statusCode = HttpStatusCodeConstants.UnProcessable;
      throw error;
    }

    // Check if team exists
    const homeTeamDetails = await Team.findOne({ where: { teamId: matchData.homeTeamId } });
    const awayTeamDetails = await Team.findOne({ where: { teamId: matchData.awayTeamId } });

    if(!homeTeamDetails || !awayTeamDetails) {
      const error = new Error(ResponseConstants.Team.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    }

    matchData.ttlBookedTkts = 0;
    matchData.createdUserId = req.decodedUser.userId;
    matchData.updatedUserId = req.decodedUser.userId;
    const newMatch = await Match.create(matchData);
    
    res.statusCode = HttpStatusCodeConstants.Created;
    res.responseBody = {
      message: ResponseConstants.Matches.CreateSuccessMessage,
      data: newMatch.matchId
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
    
    const matches = await Match.findAll({ 
      where: filters,
      order: [['scheduledDate', 'ASC']]
    });
    
    res.responseBody = { matches };
    
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
    }
    
    res.responseBody = { match };

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
    
    // Check if match exists
    const match = await Match.findByPk(matchId);
    if (!match || match.isDeleted) {
      const error = new Error(ResponseConstants.Matches.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    }

    // Check if team exists
    const homeTeamDetails = await Team.findOne({ where: { teamId: updateData.homeTeamId } });
    const awayTeamDetails = await Team.findOne({ where: { teamId: updateData.awayTeamId } });

    if(!homeTeamDetails || !awayTeamDetails) {
      const error = new Error(ResponseConstants.Team.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    }
    
    // Mark as updated
    updateData.isUpdated = true;
    updateData.updatedAt = new Date();
    updateData.updatedUserId = req.decodedUser.userId;
    updateData.ttlBookedTkts = match.ttlBookedTkts
    
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
    }

    res.statusCode = HttpStatusCodeConstants.Ok;
    res.responseBody = {
      message: ResponseConstants.Matches.UpdateSuccessMessage,
      data: updatedMatches[0]
    };
    
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
        updatedUserId: req.decodedUser.userId
      },
      {
        where: { matchId }
      }
    );
    
    res.responseBody = { message: ResponseConstants.Matches.DeleteSuccessMessage };
    
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
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); 
    const matches = await Match.findAll({
      where: {
        scheduledDate: { [Op.gte]: currentDate },
        isDeleted: false
      },
      attributes: [
        "matchId",
        "homeTeamId",
        "awayTeamId",
        "scheduledDate",
        "price",
        "ttlTkts",
        "ttlBookedTkts",
        "venue"
      ],
      include: [
        {
          model: Team,
          as: "homeTeam",
          required: true,
          attributes: ["teamId", "name", "logo"],
          where: {
            teamId: { [Op.col]: 'Match.homeTeamId' }
          }
        },
        {
          model: Team,
          as: 'awayTeam',
          required: true,
          attributes: ["teamId", "name", "logo"],
          where: {
            teamId: { [Op.col]: 'Match.awayTeamId' }
          }
        }
      ],
      order: [['scheduledDate', 'ASC']]
    });
    
    res.responseBody = { matches };
    
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