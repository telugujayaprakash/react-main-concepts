const VotingData = require('../Models/VotingSchema')

async function postvote(req, res) {
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

}

module.exports = postvote