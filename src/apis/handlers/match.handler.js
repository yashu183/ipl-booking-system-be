const { HttpStatusCodeConstants } = require('../../constants/HttpStatusCodeConstants');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { Match, Team } = require('../../models');

// Create a new match
const createMatch = async (req, res, next) => {
  try {
    const matchData = req.body;

    // check if match exists with the given data
    const existingMatch = await Match.findOne({ 
      homeTeamId: matchData.homeTeamId, 
      awayTeamId: matchData.awayTeamId, 
      scheduledDate: matchData.scheduledDate 
    });
    if(existingMatch) {
      const error = new Error(ResponseConstants.Matches.AlreadyExists);
      error.statusCode = HttpStatusCodeConstants.UnProcessable;
      throw error;
    }

    // Check if team exists
    const homeTeamDetails = await Team.findById(matchData.homeTeamId);
    const awayTeamDetails = await Team.findById(matchData.awayTeamId);

    if(!homeTeamDetails || !awayTeamDetails) {
      const error = new Error(ResponseConstants.Team.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    }

    matchData.createdUserId = req.decodedUser.userId;

    const newMatch = await Match.create(matchData);
    
    res.statusCode = HttpStatusCodeConstants.Created;
    res.responseBody = {
      message: ResponseConstants.Matches.CreateSuccessMessage,
      data: newMatch._id
    };
    
    console.log(`Match created successfully with ID: ${newMatch._id}`);
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
    
    const matches = await Match.find(filters).sort({ scheduledDate: 1 });
    
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
    
    const match = await Match.findById(matchId);
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
    const match = await Match.findById(matchId);
    if (!match || match.isDeleted) {
      const error = new Error(ResponseConstants.Matches.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    }

    // Check if team exists
    if (updateData.homeTeamId) {
      const homeTeamDetails = await Team.findById(updateData.homeTeamId);
      if (!homeTeamDetails) {
        const error = new Error(ResponseConstants.Team.NotFound);
        error.statusCode = HttpStatusCodeConstants.NotFound;
        throw error;
      }
    }

    if (updateData.awayTeamId) {
      const awayTeamDetails = await Team.findById(updateData.awayTeamId);
      if (!awayTeamDetails) {
        const error = new Error(ResponseConstants.Team.NotFound);
        error.statusCode = HttpStatusCodeConstants.NotFound;
        throw error;
      }
    }
    
    // Mark as updated
    updateData.isUpdated = true;
    updateData.updatedUserId = req.decodedUser.userId;
    
    const updatedMatch = await Match.findByIdAndUpdate(
      matchId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedMatch) {
      const error = new Error(ResponseConstants.Matches.UpdateFailed);
      throw error;
    }

    res.statusCode = HttpStatusCodeConstants.Ok;
    res.responseBody = {
      message: ResponseConstants.Matches.UpdateSuccessMessage,
      data: updatedMatch
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
    
    const match = await Match.findById(matchId);
    
    if (!match || match.isDeleted) {
      const error = new Error(ResponseConstants.Matches.NotFound);
      error.statusCode = HttpStatusCodeConstants.NotFound;
      throw error;
    }
    
    // Perform soft delete
    await Match.findByIdAndUpdate(matchId, {
      isDeleted: true,
      updatedUserId: req.decodedUser.userId
    });
    
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
    const matches = await Match.find({
      scheduledDate: { $gte: currentDate },
      isDeleted: false
    })
    .select('scheduledDate price ttlTkts ttlBookedTkts venue homeTeamId awayTeamId')
    .populate('homeTeamId', 'code logo')
    .populate('awayTeamId', 'code logo')
    .sort({ scheduledDate: 1 })
    .lean();
    
    // Transform the response to use homeTeam and awayTeam
    const transformedMatches = matches.map(match => ({
      ...match,
      matchId: match._id,
      homeTeam: match.homeTeamId,
      awayTeam: match.awayTeamId,
      homeTeamId: undefined,
      awayTeamId: undefined
    }));
    
    res.responseBody = { matches: transformedMatches };
    
    console.log(`Retrieved ${matches.length} upcoming matches`);
    next();
  } catch (error) {
    console.error('Error retrieving upcoming matches:', error.message);
    next(error);
  }
};

const filterMatches = async (req, res, next) => {
  try {
    const { teamId, scheduledDate } = req.query;

    let filterConditions = { isDeleted: false };

    if (teamId) {
      filterConditions.$or = [
        { homeTeamId: teamId },
        { awayTeamId: teamId }
      ];
    }

    if (scheduledDate) {
      const startOfDay = new Date(scheduledDate);
      const endOfDay = new Date(scheduledDate);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      filterConditions.scheduledDate = {
        $gte: startOfDay,
        $lt: endOfDay
      };
    }

    const matches = await Match.find(filterConditions)
      .select('scheduledDate price ttlTkts ttlBookedTkts venue homeTeamId awayTeamId')
      .populate('homeTeamId', 'code logo')
      .populate('awayTeamId', 'code logo')
      .lean();

    // Transform the response to use homeTeam and awayTeam
    const transformedMatches = matches.map(match => ({
      ...match,
      matchId: match._id,
      homeTeam: match.homeTeamId,
      awayTeam: match.awayTeamId,
      homeTeamId: undefined,
      awayTeamId: undefined
    }));

    res.responseBody = { matches: transformedMatches }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  getUpcomingMatches,
  filterMatches
};