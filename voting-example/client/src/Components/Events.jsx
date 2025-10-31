// import { useState } from "react";

// export default function EventsPage() {
//     const [selectedLang, setSelectedLang] = useState("");
//     const [selectedSegment, setSelectedSegment] = useState("");

//     const languages = ["Telugu", "Tamil", "Hindi", "Malayalam", "Bengali", "Kannada"];

//     const movieCategories = [
//         "Best Male Actor",
//         "Best Female Actor",
//         "Best Director",
//         "Best Comedian",
//         "Best Singer",
//         "Best Writer",
//     ];

//     const newsCategories = ["Best News", "Best Reporter", "Best Anchor"];

//     const seriesCategories = [
//         "Best Male Lead",
//         "Best Female Lead",
//         "Best Director",
//         "Best Story",
//         "Best Villain",
//     ];

//     const handleLanguageSelect = (lang) => {
//         setSelectedLang(lang);
//         setSelectedSegment("");
//     };

//     const handleSegmentSelect = (segment) => {
//         setSelectedSegment(segment);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Banner Section */}
//             <div className="relative">
//                 {/* Replace this placeholder with your 2026 Voting banner */}
//                 <img
//                     src="https://via.placeholder.com/1200x300?text=2026+Voting+Event+Banner"
//                     alt="Voting Banner"
//                     className="w-full h-64 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                     <h1 className="text-4xl md:text-5xl font-bold text-white">
//                         2026 Voting Event
//                     </h1>
//                 </div>
//             </div>

//             {/* Language Selection */}
//             <div className="max-w-5xl mx-auto py-10 px-4 text-center">
//                 <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//                     Select Your Language
//                 </h2>
//                 <div className="flex flex-wrap justify-center gap-4">
//                     {languages.map((lang) => (
//                         <button
//                             key={lang}
//                             onClick={() => handleLanguageSelect(lang)}
//                             className={`px-6 py-3 rounded-xl text-lg font-medium shadow-md transition 
//               ${selectedLang === lang
//                                     ? "bg-blue-600 text-white"
//                                     : "bg-white text-gray-700 hover:bg-blue-100"
//                                 }`}
//                         >
//                             {lang}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Segment Selection */}
//             {selectedLang && (
//                 <div className="max-w-4xl mx-auto py-6 px-4 text-center">
//                     <h3 className="text-xl font-semibold mb-4 text-gray-800">
//                         Select a Category to Vote in ({selectedLang})
//                     </h3>
//                     <div className="flex justify-center gap-6">
//                         {["Movies", "News", "Series"].map((segment) => (
//                             <button
//                                 key={segment}
//                                 onClick={() => handleSegmentSelect(segment)}
//                                 className={`px-6 py-3 rounded-xl font-medium shadow-md transition 
//                 ${selectedSegment === segment
//                                         ? "bg-green-600 text-white"
//                                         : "bg-white text-gray-700 hover:bg-green-100"
//                                     }`}
//                             >
//                                 {segment}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Category Display */}
//             {selectedSegment && (
//                 <div className="max-w-3xl mx-auto py-8 px-6">
//                     <h4 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
//                         {selectedSegment} Categories
//                     </h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {(
//                             selectedSegment === "Movies"
//                                 ? movieCategories
//                                 : selectedSegment === "News"
//                                     ? newsCategories
//                                     : seriesCategories
//                         ).map((cat) => (
//                             <div
//                                 key={cat}
//                                 className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer hover:bg-blue-50"
//                             >
//                                 <h5 className="text-lg font-medium text-gray-700">{cat}</h5>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import { useState, useEffect } from "react";
import axios from "axios";

export default function EventsPage() {
    const [selectedLang, setSelectedLang] = useState("");
    const [selectedSegment, setSelectedSegment] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [nominees, setNominees] = useState([]);

    const languages = ["Telugu", "Tamil", "Hindi", "Malayalam", "Bengali"];
    const movieCategories = [
        "Best Entertainer Male",
        "Best Entertainer Female",
        "Best Performer Male",
        "Best Performer Female",
        "Best Singer",
        "Best Writer",
    ];
    const newsCategories = ["Best News", "Best Reporter", "Best Anchor"];
    const seriesCategories = [
        "Best Male Lead",
        "Best Female Lead",
        "Best Director",
        "Best Story",
        "Best Villain",
    ];

    const handleLanguageSelect = (lang) => {
        setSelectedLang(lang);
        setSelectedSegment("");
        setSelectedCategory("");
        setNominees([]);
    };

    const handleSegmentSelect = (segment) => {
        setSelectedSegment(segment);
        setSelectedCategory("");
        setNominees([]);
    };

    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        setNominees([]);

        try {
            const res = await axios.get("http://localhost:3001/votes", {
                params: { language: selectedLang, segment: selectedSegment, category },
            });
            setNominees(res.data.nominees || []);
        } catch (err) {
            console.error("Error fetching nominees:", err);
        }
    };

    const handleVote = async (movieId) => {
        try {
            await axios.post("http://localhost:3001/vote", {
                movieId,
                category: selectedCategory,
            });
            alert("Vote recorded!");
            // Refresh nominee list
            handleCategorySelect(selectedCategory);
        } catch (err) {
            console.error("Error voting:", err);
            alert("Failed to vote!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Banner */}
            <div className="relative">
                <img
                    src="https://via.placeholder.com/1200x300?text=2026+Voting+Event+Banner"
                    alt="Voting Banner"
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">2026 Voting Event</h1>
                </div>
            </div>

            {/* Language selection */}
            <div className="max-w-5xl mx-auto py-10 px-4 text-center">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Your Language</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageSelect(lang)}
                            className={`px-6 py-3 rounded-xl text-lg font-medium shadow-md transition 
                ${selectedLang === lang ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-blue-100"}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            {/* Segment selection */}
            {selectedLang && (
                <div className="max-w-4xl mx-auto py-6 px-4 text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Select a Category to Vote in ({selectedLang})
                    </h3>
                    <div className="flex justify-center gap-6">
                        {["Movies", "News", "Series"].map((segment) => (
                            <button
                                key={segment}
                                onClick={() => handleSegmentSelect(segment)}
                                className={`px-6 py-3 rounded-xl font-medium shadow-md transition 
                  ${selectedSegment === segment ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-green-100"}`}
                            >
                                {segment}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Category selection */}
            {selectedSegment && (
                <div className="max-w-3xl mx-auto py-8 px-6 text-center">
                    <h4 className="text-2xl font-semibold mb-4 text-gray-800">
                        {selectedSegment} Categories
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(
                            selectedSegment === "Movies"
                                ? movieCategories
                                : selectedSegment === "News"
                                    ? newsCategories
                                    : seriesCategories
                        ).map((cat) => (
                            <div
                                key={cat}
                                onClick={() => handleCategorySelect(cat)}
                                className={`bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer
                  ${selectedCategory === cat ? "border-2 border-blue-600 bg-blue-50" : "hover:bg-blue-50"}`}
                            >
                                <h5 className="text-lg font-medium text-gray-700">{cat}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Nominee table */}
            {selectedCategory && nominees.length > 0 && (
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mt-10">
                    <h4 className="text-xl font-semibold mb-4 text-center">
                        {selectedCategory} — {selectedLang} ({selectedSegment})
                    </h4>
                    <table className="w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Movie Name</th>
                                <th className="border p-2">Nominee Name</th>
                                {/* <th className="border p-2">Votes</th> */}
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nominees.map((n, i) => (
                                <tr key={i} className="text-center">
                                    <td className="border p-2">{n.movieName}</td>
                                    <td className="border p-2">{n.nomineeName}</td>
                                    {/* <td className="border p-2">{n.votes}</td> */}
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleVote(n.movieId)}
                                            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Vote
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
