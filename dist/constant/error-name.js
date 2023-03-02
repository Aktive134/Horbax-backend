"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ERROR_NAME = {
    badRequest: "BadRequestError",
    serverError: "ApplicationError",
    notAuthorize: "UnauthorizeRequestError",
    forbidden: "ForbiddenError",
    notFound: "NotFoundError"
};
exports.default = ERROR_NAME;
