"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateAdmin = (req, res, next) => {
    const { payload, token } = res.locals;
    if (payload && payload.isAdmin) {
        next();
    }
    else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};
exports.default = validateAdmin;
