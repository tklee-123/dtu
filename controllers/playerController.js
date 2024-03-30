const Player = require("../models/player");
const Account = require("../models/account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const playerController = {
    register: async (req, res) => {
        try {
    
            const newUser = new Player({
                major: req.body.major,
                birth_year: req.body.birth_year,
                occupation: req.body.occupation,
                full_name: req.body.full_name,
                email: req.body.email,
                level: 0,
                current_assessment_score: 0,
                correct_ratio: 0,
                played_round_count: 0
            });
            const savedUser = await newUser.save();
    
            console.log("Player's information saved to the database:", savedUser);
            res.status(200).json(savedUser);
        } catch (error) {
            console.error("Error during user registration:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    updatePlayer: async (req, res) => {
        try {
            const playerId = req.params.id;
            const updatedInfo = req.body;
            const player = await Player.findByIdAndUpdate(playerId, updatedInfo, { new: true });

            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }

            res.status(200).json(player);
        } catch (error) {
            console.error('Error updating player information:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deletePlayer: async (req, res) => {
        try {
            const playerId = req.params.id;
            const player = await Player.findByIdAndRemove(playerId);
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }

            // Also delete the associated account
            await Account.findByIdAndRemove(player.accountId);

            res.status(200).json({ message: 'Player and associated account deleted successfully' });
        } catch (error) {
            console.error('Error deleting player:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createAccount: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Create the account
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAccount = new Account({
                username,
                password: hashedPassword,
                role: 'player'
            });
            const savedAccount = await newAccount.save();
            
            res.status(200).json(savedAccount);
        } catch (error) {
            console.error('Error creating account:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = playerController;
