const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const playerRouter = require("./routes/playerRoute")
const scriptRouter = require("./routes/scriptRoute")
const accountRouter = require("./routes/accountRoute")
const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/", playerRouter);
app.use("/", scriptRouter);
app.use("/", accountRouter)
app.listen(8000, () => {
    console.log("Server is running");
});