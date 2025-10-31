const xlsx = require("xlsx");
const VotingData = require('../Models/VotingSchema')

async function handleconversion(req, res) {
    try {
        const { language, segment } = req.body;

        // Validate user inputs
        const allowedLanguages = ["Telugu", "Tamil", "Hindi", "Malayalam", "Bengali"];
        const allowedSegments = ["Movies", "Series", "News"];
        if (!allowedLanguages.includes(language))
            return res.status(400).json({ message: "Invalid language" });
        if (!allowedSegments.includes(segment))
            return res.status(400).json({ message: "Invalid segment" });

        console.log("Reading Excel...");
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

        console.log("Mapping data...");
        const formattedData = jsonData.map((row, index) => {
            if (!row["Movie Name"]) {
                console.log(`Skipping row ${index + 2} — Missing Movie Name`);
                return null;
            }

            // Build category map dynamically
            const categoryMap = {};
            Object.keys(row).forEach((key) => {
                if (key !== "Movie Name" && row[key]) {
                    categoryMap[key.trim()] = {
                        name: row[key].trim(),
                        votes: 0,
                    };
                }
            });
            return {
                language,
                segment,
                movieName: row["Movie Name"].trim(),
                category: categoryMap,
            };
        }).filter(Boolean); // remove nulls

        if (!formattedData.length)
            return res.status(400).json({ message: "No valid movie data found." });

        await VotingData.insertMany(formattedData);
        res.status(200).json({
            message: "Movies uploaded successfully!",
            inserted: formattedData.length,
        });

    } catch (err) {
        console.error("Error uploading voting data:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { handleconversion }













