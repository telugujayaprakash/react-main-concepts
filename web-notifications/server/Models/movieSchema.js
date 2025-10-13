const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
