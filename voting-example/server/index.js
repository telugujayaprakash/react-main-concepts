const express = require('express')
const cors = require('cors')
const app = express()
const VotingData = require('./Models/VotingSchema.js')
const multer = require("multer")
const env = require('dotenv')
const { handleconversion } = require('./Controllers/coverttojson.controller.js')
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

//Controllers
app.post('/UploadMovies', upload.single("file"), (handleconversion))

// ✅ Get nominees by category
app.get("/votes", async (req, res) => {
    try {
        const { language, segment, category } = req.query;

        if (!language || !segment || !category)
            return res.status(400).json({ message: "Missing parameters" });
        const movies = await VotingData.find({ language, segment });

        // Find all matching movies for that language & segment

        const nominees = [];

        // Extract nominees for this specific category
        movies.forEach((movie) => {
            const nominee = movie.category?.get(category);
            if (nominee && nominee.name) {
                nominees.push({
                    movieName: movie.movieName,
                    nomineeName: nominee.name,
                    votes: nominee.votes,
                    movieId: movie._id,
                });
            }
        });

        res.json({ nominees });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


app.post("/vote", async (req, res) => {
    try {
        const { movieId, category } = req.body;

        const movie = await VotingData.findById(movieId);
        if (!movie || !movie.category.has(category))
            return res.status(404).json({ message: "Nominee not found" });

        // Increment vote count for this nominee
        movie.category.get(category).votes += 1;
        await movie.save();

        res.json({ message: "Vote recorded successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


app.listen(3001, () => {
    console.log("Server Started at port 3001");
})