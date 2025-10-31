const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const jwt = require('jsonwebtoken')

const secreatkey = "firstprogram"
app.get('/login', (req, res) => {
    const claims = {
        userId: 1,
        Name: "ramu",
        role: "ceo"
    }
    const token = jwt.sign(claims, secreatkey, {
        expiresIn: "100s",
        // notBefore: "5s"
    })
    res.status(200).json({ token: token })
})

app.get("/profile", (req, res) => {
    // const token=req.headers.authorization?.split(" ")[1];
    // const authHeader = req.headers.authorization;
    // const token = authHeader?.split("")[1];
    const token = req.headers["authorization"].split(" ")[1];
    const claims = jwt.verify(token, secreatkey)
    res.status(200).json({ claims })
})

app.listen(8000, () => {
    console.log("Server has been started at port 8000")
})