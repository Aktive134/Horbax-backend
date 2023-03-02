"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const { EventEmitter } = events_1.default;
class ErrorAlert extends EventEmitter {
    constructor(msg, type) {
        super();
        this.message = msg;
        this.errorType = type;
    }
    notify() {
        this.addListener("error", this.sendError);
        this.emit("error");
    }
    sendError() {
        if (process.env.NODE_ENV === "production") {
            console.log(`A new ${this.errorType} : ${this.message}`);
        }
        else {
            console.log(`A new ${this.errorType} : ${this.message}`);
        }
    }
}
exports.default = ErrorAlert;
