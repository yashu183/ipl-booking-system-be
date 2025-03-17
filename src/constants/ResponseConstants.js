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
    }
} 

module.exports.ResponseConstants = ResponseConstants;