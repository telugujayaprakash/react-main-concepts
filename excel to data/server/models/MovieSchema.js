// // const mongoose = require('mongoose');

// // const MovieSchema = new mongoose.Schema({
// //     title: {
// //         type: String,
// //     },
// //     genre: {
// //         type: String,
// //     },
// //     // crew: [{
// //     //     type: mongoose.Schema.Types.ObjectId,
// //     //     ref: "Crew"
// //     // }],
// //     lang: {
// //         type: String,
// //     }
// // });

// // // const crewSchema = new mongoose.Schema({
// // //     name: {
// // //         type: String,
// // //     },
// // //     role: {
// // //         type: String,
// // //     },
// // //     movie: {
// // //         type: mongoose.Schema.Types.ObjectId,
// // //         ref: "Movies"
// // //     }
// // // });


// // const Movies = mongoose.model("Movies", MovieSchema)
// // // const Crew = mongoose.model("Crew", crewSchema)
// // module.exports = { Movies };
// // // module.exports = { Movies, Crew };

// const mongoose = require('mongoose');

// const supportedLanguages = ['Telugu', 'Hindi', 'Kannada', 'Malayalam', 'Bojupuri', 'Bengali'];

// const ActorSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     gender: {
//         tyep: String,
//         required: true,
//     },
//     language: {
//         tyep: String,
//         enum: supportedLanguages,
//         required: true,
//     },
//     movies: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Movies"
//     }]
// });

// // const MovieSchema = new mongoose.Schema({
// //     title: {
// //         type: String,
// //         required: true,
// //     },
// //     genre: {
// //         type: String,
// //         required: true,
// //     },
// //     lang: {
// //         type: String,
// //         enum: supportedLanguages,
// //         required: true,
// //     },
// //     actors: [{
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "Actors"
// //     }]
// // });

// // const Movies = mongoose.model("Movies", MovieSchema)
// const Actors = mongoose.model("Actors", ActorSchema)
// module.exports = { Movies, Actors };