import mongoose from 'mongoose'

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

export async function connectDatabase() {
  return mongoose.connect(mongoUri)
}

export default mongoose
