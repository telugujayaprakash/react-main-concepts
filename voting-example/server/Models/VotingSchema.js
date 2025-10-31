const mongoose = require("mongoose");

const VotingSchema = new mongoose.Schema({
    language: {
        type: String,
        enum: ["Telugu", "Tamil", "Hindi", "Malayalam", "Bengali"],
        required: true,
    },
    segment: {
        type: String,
        enum: ["Movies", "News", "Serials"],
        required: true,
    },
    movieName: {
        type: String,
        required: true,
    },
    category: {
        type: Map,
        of: new mongoose.Schema({
            name: String,
            votes: {
                type: Number,
                default: 0
            }
        })
    },
    votes: {
        type: Number,
        default: 0,
    }
});

const VotingData = mongoose.model("VotingData", VotingSchema);
module.exports = VotingData
