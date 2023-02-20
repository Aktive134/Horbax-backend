import ApplicationError from "./ApplicationError";
import BadRequestError from "./BadRequestError";
import NotAuthorizeError from "./NotAuthorizedError";
import ForbiddenError from "./ForbiddenError";
import NotFoundError from "./NotFoundError";
import catchAsync from "./CatchAsyncError";

const errors = {
    NotFoundError,
    ApplicationError,
    BadRequestError,
    ForbiddenError,
    NotAuthorizeError,
    catchAsync
};

export default errors;
