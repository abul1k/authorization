const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes')
require('dotenv').config()

const port = process.env.PORT || 5000
const dbURL = process.env.DB_URL
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
  try {
    await mongoose.connect(dbURL)
    app.listen(port, () => {
      console.log(`server started on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
