const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const PromptRoute = require('./routes/PromptRoutes')
const AuthRoute = require('./routes/AuthRoutes')

require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

const app = express()

app.use(cors({
    origin: ['http://localhost:5173','https://prompt-lib-nu.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true
}))

// Use body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', AuthRoute)
app.use('/api/prompts', PromptRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
        })
    })
    .catch((error) => {
        console.error(error);
        console.log('Connection failed!')
    })
