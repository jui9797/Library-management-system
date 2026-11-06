import mongoose from "mongoose";
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    if (error instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = error.message;
    }
    else if (error instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = "Invalid ID or data format";
    }
    else if (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000) {
        statusCode = 409;
        message = "Duplicate value. This record already exists.";
    }
    else if (error instanceof Error) {
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map