// import module
const express = require('express')
const cors = require('cors')
const parser = require('body-parser')
const router = require('./routes') // get routes from routes/index.js

// init app
const app = express()

// use cors
app.use(cors())

// use body parser
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

// define port
const port = 3000

// define routes
app.get('/', (req, res) => {
    res.send('Hello World!')})

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

// use router
app.use('/api', router)
