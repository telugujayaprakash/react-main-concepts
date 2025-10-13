const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const webpush = require('web-push')
const mongoose = require('mongoose');
const Endpoint = require("./Models/EndpointSchema")
const Movie = require("./Models/movieSchema")
require('dotenv').config();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

//db connection
mongoose.connect(process.env.REACT_MONGO_URI).then(() =>
  console.log("DB connected")
).catch((err) =>
  console.log("connection error", err)
)

const endpoints = Endpoint;
const movies = Movie;

const vapidkeys = {
  publicKey: 'BBLxRSVoq-NyLXS94JCSReP_EtY2kzyUg1-z9Y7AHKqIPmNJUGF8cmmUwbtkEqvV3AMLBhCy3mKtemM5NcWPeqg',
  privateKey: 'XZh8BTSez-hRTITg5sXjlYbVd63ow-a-nCX33ThNRnE'
}
// const sub = { "endpoint": "https://fcm.googleapis.com/fcm/send/f58_WVLsRUY:APA91bHhM0w7s2qswm7WjfV7l3crKwBreRaOsPiOz6VgDBOL9AprdodjI3ugSbBG_EI9lS4Ng3EYq_hj-loMxo4QN0A6dvE3n1TCEGUkaW8VOs09k7DNOxsXkEF_e_G9Ab-MIKUJkIQV", "expirationTime": null, "keys": { "p256dh": "BBf8BUI1fkiQP7DlbS64ea0_6Q5SYcTyiCp8sN2S1X1l1accXfQw_2msZeqihdwbr9TjbmrnbQM8spH-G-u4WJA", "auth": "wKmrQfJtH8BlYtrEHgCy7Q" } }
webpush.setVapidDetails('mailto:mallareddy@gmail.com', vapidkeys.publicKey, vapidkeys.privateKey)

app.post('/', async (req, res) => {
  const { title, disc, Ep } = req.body;
  const payload = JSON.stringify({
    title,
    body: disc,
    icon: '/icon.png',
    url: 'https://www.youtube.com'
  });
  try {
    const newMovie = new movies({ title: title, desc: disc });
    await newMovie.save();
    const ifEp = await endpoints.findOne({ endpoint: Ep.endpoint });
    if (!ifEp) {
      console.log("already exists");
      const newEndpoint = new endpoints({ endpoint: Ep });
      await newEndpoint.save();
    }
  } catch (error) {
    console.log(error);
  }
  await sendNotification(Ep, payload);
  // const sub = endpoints.find()
  // await webpush.sendNotification(sub, payload);
  res.json({ success: true, message: "data received" })
});

async function sendNotification(sub, payload) {
  const subs = await endpoints.find();
  // Send push notification to each subscription
  for (const sub of subs) {
    try {
      await webpush.sendNotification(sub.endpoint, payload);
    } catch (err) {
      console.error('Error sending notification to:', sub.endpoint.endpoint, err);
    }
  }
}








app.listen(8000, () => {
  console.log("server running on port 4000");
});