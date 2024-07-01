"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../user/user.model"));
const constant_1 = __importDefault(require("../../constant"));
const config_1 = __importDefault(require("../../config"));
const CatchAsyncError_1 = __importDefault(require("../../common/error-handler/CatchAsyncError"));
const ApplicationError_1 = __importDefault(require("../../common/error-handler/ApplicationError"));
const generate_token_1 = __importDefault(require("../../lib/generate-token"));
const Messages = constant_1.default.messages;
class UserController {
    constructor() {
        this.updateUserHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { payload } = res.locals;
            const { name, email, password } = req.body;
            const user = await user_model_1.default.findById(payload._id);
            if (user) {
                user.name = name || user.name;
                user.email = email || user.email;
                if (password) {
                    const salt = await bcryptjs_1.default.genSalt(config_1.default.saltFactor);
                    const hashPassword = await bcryptjs_1.default.hash(password, salt);
                    user.password = hashPassword;
                }
                const updatedUser = await user.save();
                const token = (0, generate_token_1.default)(updatedUser);
                const { isAdmin } = updatedUser;
                res.status(201).send({ updatedUser, name, email, isAdmin, token });
            }
            else {
                return next(new ApplicationError_1.default(Messages.userNotFound));
            }
        });
        this.getUserAdmin = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const users = await user_model_1.default.find({});
            res.send(users);
        });
    }
}
exports.default = new UserController();
