require("dotenv").config();
const express = require('express');

const cors = require("cors")

const route = require('../route/router');  
const { connectDB } = require("../config/db");

connectDB();
const app = express();
app.use(cors())
app.use(express.json({ limit: "4mb" }))


app.use('/', route);


app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});
