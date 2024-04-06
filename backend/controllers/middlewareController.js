const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const Player = require("../models/player")
const mongoose = require("../connect/connect")
const middlewareController = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.token;
    
            if (token) {
                const accessToken = token.split(" ")[1];
                const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
                const account = await Account.findById(decoded.id);

                if (!account) {
                    return res.status(403).json("Token is not valid");
                }
                req.account = account;
                next()
            } else {
                return res.status(401).json("You're not authenticated");
            }
        } catch (err) {
            return res.status(403).json(err);
        }
    },    

    verifyTokenAndAdmin: async (req, res, next) => {
        try {
            await middlewareController.verifyToken(req, res, async () => {
                if (req.account.role === "admin") {
                    next();
                } else {
                    return res.status(403).json("You're not allowed to perform this action");
                }
            });
        } catch (err) {
            return res.status(403).json("Token is not valid");
        }
    },

    verifyAdminAndBusiness: async (req, res, next) => {
        try {
            await middlewareController.verifyToken(req, res, async () => {
                if (req.account.role === "teacher" || req.account.role === "business") {
                    next();
                } else {
                    return res.status(403).json("You're not allowed to perform this action");
                }
            });
        } catch (err) {
            return res.status(403).json("Token is not valid");
        }
    }
};

module.exports = middlewareController;