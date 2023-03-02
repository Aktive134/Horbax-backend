"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
