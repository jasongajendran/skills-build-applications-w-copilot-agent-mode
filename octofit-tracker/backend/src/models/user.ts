import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'athlete' },
  joinedAt: { type: Date, default: () => new Date() },
})

const User = mongoose.model('User', UserSchema)
export default User
