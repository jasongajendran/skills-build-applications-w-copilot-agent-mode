import mongoose from 'mongoose'

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  exercises: { type: [String], default: [] },
})

const Workout = mongoose.model('Workout', WorkoutSchema)
export default Workout
