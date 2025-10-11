const express = require('express')
const cors = require('cors')
const app = express()
const multer = require("multer")
const { fileconvert } = require('./Controllers/fileconversion.controller')
require('./db/connection')

app.use(express.json())
app.use(cors({
    origin: '*',
}))

const upload = multer({ dest: 'uploads/' })

app.post('/upload', upload.single("datafile"), fileconvert)


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})