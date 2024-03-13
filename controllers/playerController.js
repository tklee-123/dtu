const Player = require("../models/player")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const playerController = {
    register: async(req, res) => {
        try {
            const newUser = new Player({
                field: req.body.field,
                birthyear: req.body.birthyear,
                occupation: req.body.occupation,
                full_name: req.body.full_name,
                email: req.body.email
            })
            const user = await newUser.save()
            console.log("Player's information saved to the database:", user);
            res.status(200).json(user);
        } catch (error) {
            console.error("Error during user registration:", error);
            res.status(500).json(error);
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

            res.status(200).json({ message: 'Player deleted successfully' });
        } catch (error) {
            console.error('Error deleting player:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createAccount: async (req, res) => {
        try {
            const email = req.body.email;
            const player = await Player.findOne({ email });
    
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            player.account = {
                username: req.body.username,
                password: req.body.password
            };
    
            await player.save();
    
            res.status(200).json(player);
        } catch (error) {
            console.error('Error creating account:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
};

module.exports = playerController;