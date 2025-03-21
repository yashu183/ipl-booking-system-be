const ResponseConstants = {
    FailedResponseMessage: "Failed in Processing the Request",
    SuccessResponseMessage: "Success in Processing the Request",
    User: {
        SuccessRegistration: "User registered successfully",
        SuccessLogin: "User logged in successfully",
        Error: {
            ExistingUser: "User already exists with the given email",
            LoginFailed: "Invalid credentials"
        }
    },
    Booking: {
        InvalidTicketsMessage: "Invalid Number of Tickets",
        BookingConfirmation: "Booking confirmed",
        MatchNotFound: "Match Not Found",
        BookingNotFound: "Booking Not Found",
        BookingCancellationSuccess: "Booking cancelled successfully",
        BookingAlreadyDeleted: "Booking has been already cancelled"
    },
    Matches: {
        CreateSuccessMessage: "Match created successfully",
        UpdateSuccessMessage: "Match updated successfully",
        FetchSuccessMessage: "Match retrieved successfully",
        DeleteSuccessMessage: "Match deleted successfully",
        FetchAllSuccessMessage: "Matches retrieved successfully",
        FetchUpcomingSuccessMessage: "Upcoming matches retrieved successfully",
        NotFound: "Match not found",
        UpdateFailed: "Match is not updated"
    }
} 

module.exports.ResponseConstants = ResponseConstants;