import express from 'express'
import { connectDatabase } from './database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const port = 8000

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

const codespace = process.env.CODESPACE_NAME
const apiHost = codespace ? `${codespace}-8000.githubpreview.dev` : `localhost:${port}`
const apiUrl = `http://${apiHost}`

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on ${apiUrl}`)
      console.log(`Connected to MongoDB`)    
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
