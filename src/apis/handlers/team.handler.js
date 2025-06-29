const { Team } = require('../../models');
const { ResponseConstants } = require("../../constants/ResponseConstants");
const { HttpStatusCodeConstants } = require("../../constants/HttpStatusCodeConstants");

const getAllTeams = async (req, res, next) => {
    try {
        const teams = await Team.find({ isDeleted: false })

        if(teams.length == 0) {
            const error = new Error(ResponseConstants.Team.NotFound);
            error.statusCode = HttpStatusCodeConstants.NotFound;
            throw error;
        }
    
        res.statusCode = HttpStatusCodeConstants.Ok;
        res.responseBody = { teams};
        next();
    } catch(error) {
        console.error(`Error while getting teams : ${error.message}`);
        next(error);
    }
}

module.exports = { getAllTeams };