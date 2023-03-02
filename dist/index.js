"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const constant_1 = __importDefault(require("./constant"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
app_1.default.listen(config_1.default.serverPort, () => console.log(`${constant_1.default.messages.serverUp} ${config_1.default.serverPort}`));
mongoose_1.default.connect(config_1.default.Database.url).then(() => {
    console.log('connected to mongoDb');
}).catch((err) => {
    console.error('could not connect to mongoDb\n', err);
});
