"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../user/user.model"));
const constant_1 = __importDefault(require("../../constant"));
const config_1 = __importDefault(require("../../config"));
const CatchAsyncError_1 = __importDefault(require("../../common/error-handler/CatchAsyncError"));
const BadRequestError_1 = __importDefault(require("../../common/error-handler/BadRequestError"));
const NotAuthorizedError_1 = __importDefault(require("../../common/error-handler/NotAuthorizedError"));
const generate_token_1 = __importDefault(require("../../lib/generate-token"));
const Messages = constant_1.default.messages;
class AuthController {
    constructor() {
        this.signUpHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { name, email, password, isAdmin } = req.body;
            const data = {
                name,
                email,
                password,
                isAdmin,
            };
            const newUser = new user_model_1.default(data);
            const salt = await bcrypt_1.default.genSalt(config_1.default.saltFactor);
            const hashPassword = await bcrypt_1.default.hash(data.password, salt);
            newUser.password = hashPassword;
            const user = await newUser.save();
            const token = (0, generate_token_1.default)(user);
            res.status(201).send({ user, name, email, isAdmin, token });
        });
        this.loginHandler = (0, CatchAsyncError_1.default)(async (req, res, next) => {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(new BadRequestError_1.default(Messages.unsuccessfulLogin));
            }
            const user = await user_model_1.default.findOne({ email }).select('+password');
            if (!user) {
                return next(new NotAuthorizedError_1.default('Invalid login credentials'));
            }
            const checkPassword = await bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (!checkPassword) {
                return next(new NotAuthorizedError_1.default('Invalid login credentials'));
            }
            const { _id, name, isAdmin } = user;
            const userTokenData = {
                _id,
                name,
                email,
                isAdmin,
            };
            const token = (0, generate_token_1.default)(userTokenData);
            res.status(200).send({
                _id,
                name,
                email,
                isAdmin,
                token,
            });
        });
    }
}
exports.default = new AuthController();
