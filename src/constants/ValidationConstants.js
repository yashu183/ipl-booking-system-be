const RegisterUserValidationConstants = {
    NameString: "Name must be a string",
    NameNotEmpty: "Name should not be null or empty",
    EmailInvalid: "Email is invalid",
    PasswordNotEmpty: "Password should not be null or empty",
    PasswordLength: "Password must be atleast 8 characters"
}

const BookingValdiationConstants = {
    UserIdInt: "User Id must be a number",
    UserIdNotEmpty: "User Id should not be null or empty",
    MatchIdInt: "Match Id must be a number",
    MatchIdNotEmpty: "Match Id should not be null or empty",
    BookedTickets: "Booked Tickets must be a number",
    BookedTicketsNotEmpty: "Booked Tickets should not be null or empty",
    BookedTicketsMin: "Booked Tickets must be atleast 1",
}
module.exports = { 
    RegisterUserValidationConstants,
    BookingValdiationConstants
}