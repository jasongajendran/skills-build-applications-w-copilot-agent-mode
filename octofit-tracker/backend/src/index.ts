import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 8000

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' })
})

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit-tracker'

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`)
      console.log(`Connected to MongoDB at ${mongoUri}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
