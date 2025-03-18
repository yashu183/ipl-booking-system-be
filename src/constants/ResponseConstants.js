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
    }
} 

module.exports.ResponseConstants = ResponseConstants;