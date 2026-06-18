import mongoose from 'mongoose'

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  memberCount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
})

const Team = mongoose.model('Team', TeamSchema)
export default Team
