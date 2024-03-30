const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const crypto = require('crypto')
const Player = require("../models/player");
const { log } = require("console");
const accountController = {
    registerUser: async (req, res) => {
        try {
            // Băm mật khẩu với thuật toán SHA-256
            const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    
            // Tạo một tài khoản mới với _id của người dùng
            const newUser = new Account({
                _id: req.body._id, // Sử dụng _id của người dùng
                username: req.body.username,
                password: hashedPassword,
                role: req.body.role,
            });
    
            const user = await newUser.save();
            console.log("User saved to the database:", user);
    
            res.status(200).json(user);
        } catch (err) {
            console.error("Error during user registration:", err);
            res.status(500).json(err);
        }
    },
    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "7d" }
        );
    },

    // LOGIN USER
    loginUser: async (req, res) => {
        console.log(req.body);
        try {
            // Tìm người dùng (user) bằng email
            const user = await Player.findOne({ email: req.body.email });
    
            if (!user) {
                return res.status(404).json("Wrong username");
            }
            const id = user._id;
            const account = await Account.findById(id);
            console.log(account)
            const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
            if (hashedPassword !== account.password) {
                return res.status(404).json("Wrong password");
            }
    
            // Tạo access token và gửi lại cho người dùng
            const accessToken = accountController.generateAccessToken(user);
    
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });
    
            const { pass, ...others } = user._doc;
            return res.status(200).json({ ...others, accessToken });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


    userLogout: async (req, res) => {
        res.clearCookie("accessToken");
        res.status(200).json("Logged out!");
    },
    
    updatePassword: async (req, res) => {
        const id = req.account.id;
        const account = await Account.findById(id);
        if (!account) {
            res.status(200).json("Account doesn't exist")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(req.body.password, salt);
        account.password = hashed;
        await account.save();
        return res.status(200).json({ message: 'Password updated'});
    }
};


module.exports = accountController;
