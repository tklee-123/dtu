const FunctionModel = require("../models/function")
const Player = require("../models/function")
const mongoose = require("../connect/connect")
async function getUserPreferences(playerId) {
    try {
        const playerPreferences = await Player.findOne({ _id: playerId }, { field: 1, level: 1 });

        if (!playerPreferences) {
            return res.status(404).json({ message: "Player preferences not found" });
        }

        // Trả về thông tin lĩnh vực và cấp độ của người chơi
        return res.status(200).json(playerPreferences);
    } catch (err) {
        console.error("Error getting user preferences:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function saveFunction() {
    try {
        const functionDoc = new FunctionModel({
            _id: 'getUserPreferences',
            value: getUserPreferences
        });
        await functionDoc.save();
        console.log('Function "getUserPreferences" saved successfully.');
    } catch (error) {
        console.error('Error saving function:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Thực thi hàm saveFunction
saveFunction();