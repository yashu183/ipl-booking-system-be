const RegisterUserValidationConstants = {
    NameString: "Name must be a string",
    NameNotEmpty: "Name should not be null or empty",
    EmailInvalid: "Email is invalid",
    PasswordNotEmpty: "Password should not be null or empty",
    PasswordLength: "Password must be atleast 8 characters"
}

const BookingValdiationConstants = {
    UserIdInt: "User Id must be a number",
    UserIdInvalid: "User Id cannot be zero",
    MatchIdInt: "Match Id must be a number",
    MatchIdInvalid: "Match Id cannot be zero",
    BookedTickets: "Booked Tickets must be a number",
    BookedTicketsMin: "Booked Tickets must be atleast 1",
}

const MatchValidationConstants = {
    // HomeTeamId validation
    HomeTeamIdInt: "Home team ID must be an integer",
    HomeTeamIdInvalid: "Home team ID must be a positive number",
    HomeTeamIdRequired: "Home team ID is required",
    
    // AwayTeamId validation
    AwayTeamIdInt: "Away team ID must be an integer",
    AwayTeamIdInvalid: "Away team ID must be a positive number",
    AwayTeamIdRequired: "Away team ID is required",
    
    // Same team validation
    TeamIdsSame: "Home team and away team cannot be the same",
    
    // Venue validation
    VenueString: "Venue must be a text string",
    VenueLength: "Venue name must be between 1 and 100 characters",
    VenueRequired: "Venue is required",
    
    // ScheduledDate validation
    ScheduledDateFormat: "Scheduled date must be a valid date in ISO format",
    ScheduledDateFuture: "Scheduled date must be in the future",
    ScheduledDateRequired: "Scheduled date is required",
    
    // Price validation
    PricePositive: "Price must be a positive number",
    PriceDecimal: "Price must have at most 2 decimal places",
    PriceRequired: "Price is required",
    
    // TotalTickets validation
    TotalTicketsInt: "Total tickets must be an integer",
    TotalTicketsMin: "Total tickets must be at least 1",
    TotalTicketsRequired: "Total tickets is required",
    TotalTicketsLessThanBooked: "Total tickets cannot be less than already booked tickets",
    
    // BookedTickets validation
    BookedTicketsInt: "Booked tickets must be an integer",
    BookedTicketsMin: "Booked tickets cannot be negative",
    BookedTicketsExceed: "Booked tickets cannot exceed total tickets",
    
    // Match ID validation
    MatchIdInt: "Match ID must be an integer",
    MatchIdInvalid: "Match ID must be a positive number",
    MatchIdRequired: "Match ID is required",
    
    // CreatedUserId validation
    CreatedUserIdInt: "Creator user ID must be an integer",
    CreatedUserIdInvalid: "Creator user ID must be a positive number",
    CreatedUserIdRequired: "Creator user ID is required",
    
    // UpdatedUserId validation
    UpdatedUserIdInt: "Updater user ID must be an integer",
    UpdatedUserIdInvalid: "Updater user ID must be a positive number",
};

module.exports = { 
    RegisterUserValidationConstants,
    BookingValdiationConstants,
    MatchValidationConstants
}