const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongodb connection successfull"))
    .catch(err => console.error("mongo error:", err));