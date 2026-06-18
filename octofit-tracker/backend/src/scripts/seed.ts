import { connectDatabase } from '../database'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import LeaderboardEntry from '../models/leaderboard'
import Workout from '../models/workout'

// Seed the octofit_db database with test data
async function seedDatabase() {
  await connectDatabase()

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.create([
    { name: 'Avery Chan', email: 'avery.chan@octofit.com', role: 'athlete' },
    { name: 'Mila Park', email: 'mila.park@octofit.com', role: 'coach' },
  ])

  const teams = await Team.create([
    { name: 'Ocean Runners', description: 'Weekly coastal endurance team', memberCount: 14 },
    { name: 'Peak Pushers', description: 'Strength and HIIT athletes', memberCount: 10 },
  ])

  const activities = await Activity.create([
    {
      userId: users[0]._id,
      type: 'run',
      distanceKm: 10,
      durationMinutes: 55,
      caloriesBurned: 680,
      date: new Date('2026-06-10T08:00:00Z'),
    },
    {
      userId: users[1]._id,
      type: 'bike',
      distanceKm: 35,
      durationMinutes: 95,
      caloriesBurned: 940,
      date: new Date('2026-06-11T18:30:00Z'),
    },
  ])

  const leaderboard = await LeaderboardEntry.create([
    { teamId: teams[0]._id, rank: 1, points: 2140 },
    { teamId: teams[1]._id, rank: 2, points: 1890 },
  ])

  const workouts = await Workout.create([
    {
      name: 'Full Body Strength',
      description: 'A balanced strength training circuit with core and legs.',
      durationMinutes: 50,
      difficulty: 'intermediate',
      exercises: ['Squats', 'Push-ups', 'Deadlifts', 'Planks'],
    },
    {
      name: 'Recovery Flow',
      description: 'Mobility and light stretching to promote recovery.',
      durationMinutes: 30,
      difficulty: 'easy',
      exercises: ['Dynamic Stretching', 'Yoga Flow', 'Foam Rolling'],
    },
  ])

  console.log('Seed the octofit_db database with test data')
  console.log('Inserted users:', users.length)
  console.log('Inserted teams:', teams.length)
  console.log('Inserted activities:', activities.length)
  console.log('Inserted leaderboard entries:', leaderboard.length)
  console.log('Inserted workouts:', workouts.length)

  await mongoose.disconnect()
}

seedDatabase().catch((error) => {
  console.error('Failed to seed database:', error)
  process.exit(1)
})
