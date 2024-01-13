const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5000;
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cors())

// const connectDB = require('./db')
// connectDB()

app.post('/attachments', upload.array('files'), async (req, res) => {
    try {
        const files = req.files
        if (files.length === 0) {
            const error = new Error('Please upload a file')
            return res.status(400).send(error.message)
        }
        return res.status(200).json({ message: "files uploaded successfully", files: files })
    } catch (error) {
        console.log(error)
        return res.status(error.httpStatusCode || 500).send(error.message)
    }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));