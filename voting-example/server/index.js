const express = require('express')
const cors = require('cors')
const app = express()
const multer = require("multer")
const env = require('dotenv')
const { handleconversion } = require('./Controllers/coverttojson.controller.js')
const getvotes = require('./Controllers/getvotes.controller.js')
const postvote = require('./Controllers/postvote.controller.js')
env.config()
app.use(
    cors({
        origin: '*'
    })
)
app.use(express.json())

// MongoDB connection
require('./DB/Connection')

// const upload = multer({ dest: 'uploads/' })
// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload Movies
app.post('/UploadMovies', upload.single("file"), (handleconversion))

// Get nominees by category
app.get("/votes", getvotes);

//post votes
app.post("/vote", postvote);


app.listen(3001, () => {
    console.log("Server Started at port 3001");
})