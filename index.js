const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const playerRouter = require("./routes/playerRouter")

const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/", playerRouter);
app.listen(8000, () => {
    console.log("Server is running");
});