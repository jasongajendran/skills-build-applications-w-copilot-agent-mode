import mongoose from 'mongoose'

const LeaderboardEntrySchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
})

const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema)
export default LeaderboardEntry
