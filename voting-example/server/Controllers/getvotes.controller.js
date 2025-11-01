const VotingData = require('../Models/VotingSchema')

async function getvotes(req, res) {
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

}

module.exports = getvotes