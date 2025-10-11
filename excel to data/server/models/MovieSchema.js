const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    crew: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crew"
    }],
    lang: {
        type: String,
    }
});

const crewSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    role: {
        type: String,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies"
    }
});


const Movies = mongoose.model("Movies", MovieSchema)
const Crew = mongoose.model("Crew", crewSchema)
module.exports = { Movies, Crew };