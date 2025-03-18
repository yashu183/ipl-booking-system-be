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
module.exports = { 
    RegisterUserValidationConstants,
    BookingValdiationConstants
}